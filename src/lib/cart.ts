"use client";

import { useEffect, useState } from "react";

export type CartItem = {
  productId: string;
  qty: number;
};

const cartKey = (slug: string) => `neni:cart:${slug}`;
const cartEvent = (slug: string) => `neni:cart:${slug}:change`;

function readCart(slug: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(cartKey(slug));
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(slug: string, items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(cartKey(slug), JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(cartEvent(slug)));
  } catch {
    // Ignore quota or serialization errors — cart is best-effort persistence.
  }
}

export type UseCart = {
  items: CartItem[];
  hydrated: boolean;
  add: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export function useCart(slug: string): UseCart {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart(slug));
    setHydrated(true);

    function handler() {
      setItems(readCart(slug));
    }
    const event = cartEvent(slug);
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [slug]);

  function update(producer: (prev: CartItem[]) => CartItem[]) {
    setItems((prev) => {
      const next = producer(prev);
      writeCart(slug, next);
      return next;
    });
  }

  return {
    items,
    hydrated,
    add(productId) {
      update((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { productId, qty: 1 }];
      });
    },
    setQty(productId, qty) {
      update((prev) => {
        if (qty <= 0) {
          return prev.filter((i) => i.productId !== productId);
        }
        return prev.map((i) => (i.productId === productId ? { ...i, qty } : i));
      });
    },
    remove(productId) {
      update((prev) => prev.filter((i) => i.productId !== productId));
    },
    clear() {
      update(() => []);
    },
  };
}
