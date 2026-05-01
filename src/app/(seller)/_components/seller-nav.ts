import {
  BagIcon,
  ChartIcon,
  PkgIcon,
  StoreIcon,
} from "@/components/neni-icons";

export type SellerNavItem = {
  href: string;
  label: string;
  icon: typeof ChartIcon;
};

export const SELLER_NAV: SellerNavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: ChartIcon },
  { href: "/pedidos", label: "Pedidos", icon: BagIcon },
  { href: "/tienda", label: "Tienda", icon: StoreIcon },
  { href: "/productos", label: "Productos", icon: PkgIcon },
];
