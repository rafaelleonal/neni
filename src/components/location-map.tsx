"use client";

import { Map, Marker } from "pigeon-maps";

import { ArrowIcon } from "@/components/neni-icons";

/**
 * Extrae coordenadas (lat, lng) de un link de Google Maps. Soporta los
 * formatos más comunes:
 *   - https://www.google.com/maps/search/?api=1&query=19.4326,-99.1332
 *   - https://maps.google.com/?q=19.4326,-99.1332
 *   - https://www.google.com/maps/place/.../@19.4326,-99.1332,15z
 *   - "19.4326,-99.1332" pegado a pelo
 */
function parseLatLng(link: string): [number, number] | null {
  if (!link) return null;
  const patterns = [
    /[?&]query=(-?\d+\.?\d*)%2C(-?\d+\.?\d*)/i,
    /[?&]query=(-?\d+\.?\d*),(-?\d+\.?\d*)/i,
    /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/i,
    /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/,
  ];
  for (const p of patterns) {
    const m = link.match(p);
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

type LocationMapProps = {
  link: string;
  height?: number;
  zoom?: number;
};

/**
 * Defense-in-depth: aunque el endpoint sólo guarda URLs canónicas de Google
 * Maps, validamos también del lado cliente que cualquier `href` que terminemos
 * renderizando sea http(s). Bloquea `data:`, `javascript:` (que React 19 ya
 * sanea), `vbscript:`, `file:`, etc.
 */
function isHttpUrl(link: string): boolean {
  try {
    return /^https?:$/.test(new URL(link).protocol);
  } catch {
    return false;
  }
}

export function LocationMap({ link, height = 220, zoom = 16 }: LocationMapProps) {
  const coords = parseLatLng(link);
  const linkIsSafe = isHttpUrl(link);

  // Si no podemos parsear coords (link arbitrario) o el protocolo es inseguro,
  // caemos al CTA original "Abrir en Google Maps". Si tampoco es http(s),
  // simplemente no renderizamos nada para no exponer un link peligroso.
  if (!coords) {
    if (!linkIsSafe) return null;
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="border-td-line text-td-ink hover:bg-td-bg flex w-full items-center justify-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm font-semibold transition-colors"
      >
        <span aria-hidden>📍</span>
        Ver ubicación
        <ArrowIcon size={14} stroke="currentColor" />
      </a>
    );
  }

  const [lat, lng] = coords;
  const fullLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="border-td-line overflow-hidden rounded-2xl border bg-white">
      <div style={{ height }}>
        <Map defaultCenter={coords} defaultZoom={zoom} attributionPrefix={false}>
          <Marker width={40} anchor={coords} color="#1FAA59" />
        </Map>
      </div>
      <a
        href={fullLink}
        target="_blank"
        rel="noopener noreferrer"
        className="border-t-td-line text-td-ink hover:bg-td-bg flex items-center justify-center gap-2 border-t px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <span aria-hidden>📍</span>
        Abrir en Google Maps
        <ArrowIcon size={14} stroke="currentColor" />
      </a>
    </div>
  );
}
