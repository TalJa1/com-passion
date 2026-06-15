import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface Order {
  id: string;
  date: string; // ISO
  items: { name: string; qty: number; price: number }[];
  donation: number;
  total: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
}

interface AuthValue {
  user: User | null;
  /** Đăng nhập giả lập. Google OAuth thật cần backend — xem ghi chú README. */
  login: (name: string, email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  /** Tổng giá trị đã đóng góp (mua + donate). */
  totalContribution: number;
}

const AuthContext = createContext<AuthValue | null>(null);
const KEY = 'compassion.user';

const seedOrders: Order[] = [
  {
    id: 'ORD-2048',
    date: '2026-05-12',
    items: [{ name: 'Giỏ mây Buôn Bản', qty: 1, price: 185000 }],
    donation: 15000,
    total: 200000,
  },
  {
    id: 'ORD-1990',
    date: '2026-04-03',
    items: [{ name: 'Giỏ cỏ bàng Thị Thành', qty: 2, price: 210000 }],
    donation: 0,
    total: 420000,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const value = useMemo<AuthValue>(() => {
    const login: AuthValue['login'] = (name, email) =>
      setUser({ name, email, orders: seedOrders });
    const logout = () => setUser(null);
    const addOrder: AuthValue['addOrder'] = (order) =>
      setUser((prev) => (prev ? { ...prev, orders: [order, ...prev.orders] } : prev));
    const totalContribution = user?.orders.reduce((s, o) => s + o.total, 0) ?? 0;
    return { user, login, logout, addOrder, totalContribution };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Huy hiệu theo tổng đóng góp. */
export function badgeFor(total: number) {
  if (total >= 1000000) return { name: 'Người gieo mầm', emoji: '🌳', tier: 3 };
  if (total >= 500000) return { name: 'Người đồng hành', emoji: '🌿', tier: 2 };
  if (total >= 1) return { name: 'Hạt giống', emoji: '🌱', tier: 1 };
  return { name: 'Người mới', emoji: '🤍', tier: 0 };
}
