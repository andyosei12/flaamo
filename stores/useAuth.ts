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
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "flaamo-auth", // localStorage key
    }
  )
);
