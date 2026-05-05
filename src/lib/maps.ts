import "server-only";

// Hosts permitidos para hacer fetch externo. Acotamos a Google Maps
// específicamente — `goo.gl` / `g.co` son shorteners genéricos donde un atacante
// puede crear redirects arbitrarios (SSRF a IPs internas, metadata services).
const SHORTLINK_HOST = "maps.app.goo.gl";
const CANONICAL_HOSTS = new Set([
  "www.google.com",
  "google.com",
  "maps.google.com",
]);

function tryUrl(link: string): URL | null {
  try {
    const url = new URL(link);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}

/**
 * Patrones donde aparecen coordenadas en respuestas de Google Maps:
 *   - `center=16.2350,-92.1335` (con o sin URL-encoding)
 *   - `@16.2350,-92.1335,18z` (URL canónica de Maps)
 *   - `?q=16.2350,-92.1335`
 */
const COORD_PATTERNS: RegExp[] = [
  /[?&]center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/i,
  /[?&]center=(-?\d+\.\d+),(-?\d+\.\d+)/i,
  /@(-?\d+\.\d+),(-?\d+\.\d+),\d+(?:\.\d+)?z/,
  /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/i,
  /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/i,
];

function extractCoords(text: string): [number, number] | null {
  for (const p of COORD_PATTERNS) {
    const m = text.match(p);
    if (m && m[1] && m[2]) {
      const lat = parseFloat(m[1]);
      const lng = parseFloat(m[2]);
      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        Math.abs(lat) <= 90 &&
        Math.abs(lng) <= 180
      ) {
        return [lat, lng];
      }
    }
  }
  return null;
}

function canonicalLink(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/**
 * Convierte un shortlink (`maps.app.goo.gl/...`) en la URL canónica con
 * `query=lat,lng`. Sólo hacemos fetch al host exacto `maps.app.goo.gl` — el
 * fetch va contra un dominio fijo de Google, no contra un destino arbitrario,
 * por lo que no hay vector SSRF (incluso si Google redirigiera a una IP
 * interna nunca lo veríamos al no seguir redirects manualmente; pero por
 * defensa-en-profundidad usamos `redirect: "manual"` y solo leemos el body de
 * la primera respuesta).
 *
 * Devuelve `null` si no logra extraer coordenadas o si el host no está en la
 * allowlist (input no confiable). Cuando devuelve `null`, el caller debe
 * descartar el link, no guardarlo crudo.
 */
export async function resolveMapsShortLink(
  link: string,
  timeoutMs = 5000
): Promise<string | null> {
  const url = tryUrl(link);
  if (!url) return null;

  // Caso 1: ya es URL canónica de Google Maps. Intentamos extraer coords.
  if (CANONICAL_HOSTS.has(url.host)) {
    const coords = extractCoords(link);
    return coords ? canonicalLink(...coords) : null;
  }

  // Caso 2: shortlink oficial de Google. Hacemos fetch al host fijo.
  if (url.host !== SHORTLINK_HOST) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(link, {
      method: "GET",
      // No seguimos redirects automáticamente — el body inicial de
      // maps.app.goo.gl ya contiene `center=lat,lng` embebido en la página.
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    // `redirect: "manual"` retorna `type: "opaqueredirect"` para 3xx; eso
    // significa que el shortlink redirige sin servir HTML — no podemos
    // resolverlo sin leer el header `Location` (no expuesto en fetch).
    // Para los `maps.app.goo.gl/...` reales el body se sirve directo (200 OK).
    if (!res.ok || res.type === "opaqueredirect") return null;
    const html = await res.text();
    const coords = extractCoords(html);
    return coords ? canonicalLink(...coords) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Wrapper para uso en endpoints. Si no podemos resolver a una URL canónica,
 * devolvemos `null` — el caller debe descartar el link en vez de guardar el
 * input crudo. Esto cierra el riesgo de guardar `data:`, `javascript:` u otros
 * schemes peligrosos que zod hubiera dejado pasar.
 */
export async function expandLocationLink(
  link: string
): Promise<string | null> {
  return resolveMapsShortLink(link);
}
