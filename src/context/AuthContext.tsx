import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';
import { api, clearToken, getToken, setOnUnauthorized, setToken } from '../lib/api';
import type { User } from '../data/types';

interface AuthValue {
  user: User | null;
  /** Đang khôi phục phiên đăng nhập từ token đã lưu. */
  loading: boolean;
  /** Đăng nhập bằng Google ID token (credential từ Google Identity Services). */
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  /** Tải lại thông tin người dùng (vd. sau khi đặt hàng). */
  refresh: () => Promise<void>;
  /** Tổng giá trị đã đóng góp (mua + donate). */
  totalContribution: number;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => !!getToken());

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    // Tắt tự động chọn tài khoản của Google, nếu không lần đăng nhập kế tiếp
    // sẽ bị "kẹt" do Google cố đăng nhập ngầm lại tài khoản vừa đăng xuất.
    googleLogout();
  }, []);

  // Đăng xuất tự động khi backend trả 401.
  useEffect(() => {
    setOnUnauthorized(logout);
    return () => setOnUnauthorized(null);
  }, [logout]);

  // Khôi phục phiên từ token đã lưu.
  useEffect(() => {
    if (!getToken()) return;
    api
      .me()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const res = await api.loginWithGoogle(credential);
    setToken(res.accessToken);
    setUser(res.user);
  }, []);

  const refresh = useCallback(async () => {
    if (!getToken()) return;
    try {
      setUser(await api.me());
    } catch {
      /* giữ dữ liệu cũ nếu tải lại thất bại */
    }
  }, []);

  const value = useMemo<AuthValue>(() => {
    const totalContribution = user?.orders.reduce((s, o) => s + o.total, 0) ?? 0;
    return { user, loading, loginWithGoogle, logout, refresh, totalContribution };
  }, [user, loading, loginWithGoogle, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Huy hiệu theo tổng đóng góp. */
// eslint-disable-next-line react-refresh/only-export-components
export function badgeFor(total: number) {
  if (total >= 1000000) return { name: 'Người gieo mầm', emoji: '🌳', tier: 3 };
  if (total >= 500000) return { name: 'Người đồng hành', emoji: '🌿', tier: 2 };
  if (total >= 1) return { name: 'Hạt giống', emoji: '🌱', tier: 1 };
  return { name: 'Người mới', emoji: '🤍', tier: 0 };
}
