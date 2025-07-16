import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  full_name: string;
  phone: string;
  verified_at: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiresAt: number | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setTokenExpiresAt: (expiresAt: number) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiresAt: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setTokenExpiresAt: (expiresAt) => set({ tokenExpiresAt: expiresAt }),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          tokenExpiresAt: null,
        }),

      isAuthenticated: () => {
        const { token, tokenExpiresAt } = get();
        return !!token && !!tokenExpiresAt && Date.now() < tokenExpiresAt;
      },
    }),
    {
      name: "flaamo-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tokenExpiresAt: state.tokenExpiresAt,
      }),
    }
  )
);
