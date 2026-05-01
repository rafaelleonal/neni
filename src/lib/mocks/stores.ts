import type { ProductTone } from "@/lib/tokens";

export type StorefrontProduct = {
  id: string;
  name: string;
  price: number;
  old?: number;
  desc: string;
  tone: ProductTone;
  tag?: string;
  category: string;
};

export type StorePromo = {
  label: string;
  title: string;
  code: string;
  gradient: string;
};

export type Storefront = {
  slug: string;
  name: string;
  initials: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  delivery: string;
  shipping: string;
  status: "open" | "closed";
  promo?: StorePromo;
  categories: string[];
  featuredId: string;
  products: StorefrontProduct[];
};

const STORES: Record<string, Storefront> = {
  mariskincare: {
    slug: "mariskincare",
    name: "Mari Skincare",
    initials: "MS",
    description: "Skincare natural hecho en casa · CDMX",
    location: "CDMX",
    rating: 4.9,
    reviews: 184,
    delivery: "1–2 días",
    shipping: "Gratis >$500",
    status: "open",
    promo: {
      label: "Promo de la semana",
      title: "20% off en cuidado facial",
      code: "MARI20",
      gradient: "linear-gradient(135deg,#E63978_0%,#C9562C_100%)",
    },
    categories: ["Todos", "Rostro", "Cuerpo", "Labios", "Kits"],
    featuredId: "p-serum",
    products: [
      {
        id: "p-serum",
        name: "Serum Vit C",
        price: 340,
        old: 420,
        desc: "30 ml · rostro · vitamina C 15%. Aclara manchas y da luminosidad.",
        tone: "warm",
        tag: "Top ventas",
        category: "Rostro",
      },
      {
        id: "p-crema-noche",
        name: "Crema de noche",
        price: 450,
        desc: "50 g · hidratante",
        tone: "sand",
        category: "Rostro",
      },
      {
        id: "p-tonico-rosas",
        name: "Tónico de rosas",
        price: 180,
        desc: "120 ml",
        tone: "cream",
        category: "Rostro",
      },
      {
        id: "p-mascarilla",
        name: "Mascarilla arcilla",
        price: 220,
        desc: "rostro",
        tone: "clay",
        tag: "Nuevo",
        category: "Rostro",
      },
      {
        id: "p-bruma",
        name: "Bruma facial",
        price: 160,
        desc: "100 ml",
        tone: "cream",
        category: "Rostro",
      },
      {
        id: "p-balsamo",
        name: "Bálsamo labial",
        price: 95,
        desc: "vainilla",
        tone: "warm",
        category: "Labios",
      },
      {
        id: "p-aceite-corporal",
        name: "Aceite corporal",
        price: 280,
        desc: "150 ml · cuerpo",
        tone: "sand",
        category: "Cuerpo",
      },
      {
        id: "p-kit-rutina",
        name: "Kit rutina completa",
        price: 890,
        old: 1100,
        desc: "Serum + crema + tónico",
        tone: "warm",
        tag: "Ahorra 19%",
        category: "Kits",
      },
    ],
  },

  tacosdonmemo: {
    slug: "tacosdonmemo",
    name: "Tacos Don Memo",
    initials: "DM",
    description: "Taquería tradicional · Puebla",
    location: "Puebla",
    rating: 4.8,
    reviews: 312,
    delivery: "30 min",
    shipping: "Envío $20",
    status: "open",
    promo: {
      label: "Promo del día",
      title: "3x2 en tacos al pastor",
      code: "PASTOR3",
      gradient: "linear-gradient(135deg,#C9562C_0%,#E63978_100%)",
    },
    categories: ["Todos", "Tacos", "Especiales", "Bebidas"],
    featuredId: "t-pastor",
    products: [
      {
        id: "t-pastor",
        name: "Taco al pastor",
        price: 25,
        desc: "Pastor con piña, cilantro y cebolla",
        tone: "warm",
        tag: "El favorito",
        category: "Tacos",
      },
      {
        id: "t-gringa",
        name: "Gringa de pastor",
        price: 75,
        desc: "Tortilla de harina con queso",
        tone: "sand",
        category: "Especiales",
      },
      {
        id: "t-quesadilla",
        name: "Quesadilla",
        price: 35,
        desc: "Tortilla de maíz con queso oaxaca",
        tone: "cream",
        category: "Tacos",
      },
      {
        id: "t-alambre",
        name: "Alambre clásico",
        price: 140,
        desc: "Carne, pimientos, cebolla, queso",
        tone: "clay",
        tag: "Para compartir",
        category: "Especiales",
      },
      {
        id: "t-horchata",
        name: "Agua de horchata",
        price: 25,
        desc: "Vaso de 500 ml",
        tone: "cream",
        category: "Bebidas",
      },
      {
        id: "t-jamaica",
        name: "Agua de jamaica",
        price: 25,
        desc: "Vaso de 500 ml",
        tone: "warm",
        category: "Bebidas",
      },
    ],
  },
};

export function getStorefront(slug: string): Storefront | null {
  return STORES[slug] ?? null;
}

export function listStorefrontSlugs(): string[] {
  return Object.keys(STORES);
}
