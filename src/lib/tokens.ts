export const NENI_TOKENS = {
  accent: "#1FAA59",
  accentInk: "#0F3D26",
  bg: "#FAF8F4",
  ink: "#141311",
  mute: "#6B6760",
  line: "#E8E3DA",
  card: "#FFFFFF",
  canvas: "#F3EFE7",
} as const;

export const ACCENT_PRESETS = {
  "Verde WhatsApp": "#1FAA59",
  "Negro mínimo": "#141311",
  "Azul fintech": "#2E5BFF",
  Terracota: "#C9562C",
  Rosa: "#E63978",
} as const;

export type AccentPreset = keyof typeof ACCENT_PRESETS;

export type LogoVariant = "v1" | "v2" | "v3";

export const PRODUCT_TONES = {
  warm: { bg: "#EFE9DD", ink: "#8C8576" },
  sand: { bg: "#E6DFD1", ink: "#7A7362" },
  cream: { bg: "#F4EEDF", ink: "#9C9481" },
  clay: { bg: "#E9E3D4", ink: "#85806F" },
} as const;

export type ProductTone = keyof typeof PRODUCT_TONES;
