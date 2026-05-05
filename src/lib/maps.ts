import "server-only";

const SHORTLINK_HOSTS = [
  "maps.app.goo.gl",
  "goo.gl",
  "g.co",
  "maps.goo.gl",
];

function isMapsShortlink(link: string): boolean {
  try {
    const url = new URL(link);
    return SHORTLINK_HOSTS.some(
      (h) => url.host === h || url.host.endsWith(`.${h}`)
    );
  } catch {
    return false;
  }
}

/**
 * Patrones donde aparecen coordenadas en respuestas de Google Maps:
 *   - `center=16.2350,-92.1335` (URL params, con o sin URL-encoding)
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
 * `query=lat,lng`. Hace un GET al shortlink y extrae las coordenadas del HTML
 * (Google embebe `center=lat%2Clng` en la página del preview).
 *
 * Devuelve `null` si no logra extraer coordenadas o si el fetch falla/timeout.
 */
export async function resolveMapsShortLink(
  link: string,
  timeoutMs = 5000
): Promise<string | null> {
  if (!isMapsShortlink(link)) {
    // Ya es URL completa — intentar extraer coords directo.
    const coords = extractCoords(link);
    return coords ? canonicalLink(...coords) : link;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(link, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (!res.ok) return null;
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
 * Wrapper que NUNCA falla. Si no podemos resolver, devolvemos el link
 * original — la UI lo manejará con el botón "Ver ubicación" de fallback.
 */
export async function expandLocationLink(link: string): Promise<string> {
  const resolved = await resolveMapsShortLink(link);
  return resolved ?? link;
}
