import type { ProductTone } from "@/lib/tokens";

export type StoreProduct = {
  name: string;
  price: number;
  old?: number;
  tone: ProductTone;
  tag?: string;
  desc: string;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    name: "Serum Vit C",
    price: 340,
    old: 420,
    tone: "warm",
    tag: "Más vendido",
    desc: "30 ml · rostro",
  },
  {
    name: "Crema de noche",
    price: 450,
    tone: "sand",
    desc: "50 g · hidratante",
  },
  { name: "Tónico de rosas", price: 180, tone: "cream", desc: "120 ml" },
  {
    name: "Mascarilla arcilla",
    price: 220,
    tone: "clay",
    tag: "Nuevo",
    desc: "rostro",
  },
  { name: "Bruma facial", price: 160, tone: "cream", desc: "100 ml" },
  { name: "Bálsamo labial", price: 95, tone: "warm", desc: "vainilla" },
];

export type SellerProduct = {
  name: string;
  price: number;
  stock: "Disponible" | "Agotado";
  tone: ProductTone;
  visible: boolean;
};

export const SELLER_PRODUCTS: SellerProduct[] = [
  {
    name: "Taco al pastor",
    price: 25,
    stock: "Disponible",
    tone: "warm",
    visible: true,
  },
  {
    name: "Gringa de pastor",
    price: 75,
    stock: "Disponible",
    tone: "sand",
    visible: true,
  },
  {
    name: "Quesadilla",
    price: 35,
    stock: "Disponible",
    tone: "cream",
    visible: true,
  },
  {
    name: "Alambre clásico",
    price: 140,
    stock: "Agotado",
    tone: "clay",
    visible: false,
  },
  {
    name: "Agua de horchata",
    price: 25,
    stock: "Disponible",
    tone: "cream",
    visible: true,
  },
];
