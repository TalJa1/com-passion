import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { auth as firebaseAuth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail, sendEmailVerification, updateProfile, updatePassword } from 'firebase/auth';
import { api, clearToken, getToken, setOnUnauthorized, setToken } from '../lib/api';
import type { User } from '../data/types';

interface AuthValue {
  user: User | null;
  /** Đang khôi phục phiên đăng nhập từ token đã lưu. */
  loading: boolean;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  registerWithEmail: (e: string, p: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (e: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Tải lại thông tin người dùng (vd. sau khi đặt hàng). */
  refresh: () => Promise<void>;
  /** Tổng giá trị đã đóng góp (mua + donate). */
  totalContribution: number;
  updateUserProfile: (name: string, avatar: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => !!getToken());

  const logout = useCallback(async () => {
    await signOut(firebaseAuth).catch(() => {});
    clearToken();
    setUser(null);
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

  const _syncWithBackend = async (idToken: string) => {
    const res = await api.loginWithFirebase(idToken);
    // The backend uses access_token as per standard TokenResponse, but wait, the type is AuthResponse in frontend. Let's check api.ts or use res.accessToken / res.access_token depending on backend.
    // The backend returns access_token but frontend api.ts expects accessToken?
    // In auth.py it returns TokenResponse(access_token=..., user=...)
    // Wait, FastAPI BaseModel translates access_token to access_token in json.
    // So it's res.access_token. Let's cast as any if TypeScript complains.
    setToken((res as any).access_token || (res as any).accessToken);
    setUser(res.user);
  };

  const loginWithEmail = useCallback(async (e: string, p: string) => {
    const cred = await signInWithEmailAndPassword(firebaseAuth, e, p);
    if (!cred.user.emailVerified) {
      await signOut(firebaseAuth).catch(() => {});
      throw new Error('EMAIL_NOT_VERIFIED');
    }
    const token = await cred.user.getIdToken();
    await _syncWithBackend(token);
  }, []);

  const registerWithEmail = useCallback(async (e: string, p: string) => {
    const cred = await createUserWithEmailAndPassword(firebaseAuth, e, p);
    await sendEmailVerification(cred.user);
    await signOut(firebaseAuth).catch(() => {});
    throw new Error('VERIFY_EMAIL');
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(firebaseAuth, provider);
    const token = await cred.user.getIdToken();
    await _syncWithBackend(token);
  }, []);

  const resetPassword = useCallback(async (e: string) => {
    await sendPasswordResetEmail(firebaseAuth, e);
  }, []);

  const refresh = useCallback(async () => {
    if (!getToken()) return;
    try {
      setUser(await api.me());
    } catch {
      /* giữ dữ liệu cũ nếu tải lại thất bại */
    }
  }, []);

  const updateUserProfile = useCallback(async (name: string, avatar: string) => {
    if (!firebaseAuth.currentUser) throw new Error("Chưa đăng nhập");
    const updatedUser = await api.updateProfile({ name, avatar });
    await updateProfile(firebaseAuth.currentUser, { displayName: name, photoURL: avatar }).catch(() => {});
    setUser(updatedUser);
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    if (!firebaseAuth.currentUser) throw new Error("Chưa đăng nhập");
    await updatePassword(firebaseAuth.currentUser, newPassword);
  }, []);

  const value = useMemo<AuthValue>(() => {
    const totalContribution = user?.orders.reduce((s, o) => s + o.total, 0) ?? 0;
    return { user, loading, loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword, logout, refresh, totalContribution, updateUserProfile, changePassword };
  }, [user, loading, loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword, logout, refresh, updateUserProfile, changePassword]);

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
