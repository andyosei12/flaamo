// stores/useAuth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  phone: string;
  full_name: string;
  verified_at?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  tokenExpiresAt: number | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setTokenExpiresAt: (timestamp: number) => void;
  clearAuth: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      tokenExpiresAt: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setTokenExpiresAt: (timestamp) => set({ tokenExpiresAt: timestamp }),
      clearAuth: () => set({ user: null, token: null, tokenExpiresAt: null }),
    }),
    {
      name: "flaamo-auth", // localStorage key
    }
  )
);

export const isAuthenticated = () => {
  const { token } = useAuth.getState();
  return !!token;
};
