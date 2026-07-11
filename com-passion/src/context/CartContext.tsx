import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../data/types';

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);
const KEY = 'compassion.cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const add: CartValue['add'] = (product, qty = 1) =>
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id ? { ...l, qty: Math.min(l.qty + qty, product.stock) } : l
          );
        }
        return [...prev, { product, qty }];
      });

    const setQty: CartValue['setQty'] = (id, qty) =>
      setLines((prev) =>
        prev
          .map((l) => (l.product.id === id ? { ...l, qty: Math.max(0, Math.min(qty, l.product.stock)) } : l))
          .filter((l) => l.qty > 0)
      );

    const remove: CartValue['remove'] = (id) => setLines((prev) => prev.filter((l) => l.product.id !== id));
    const clear = () => setLines([]);

    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);

    return { lines, count, subtotal, add, setQty, remove, clear };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
