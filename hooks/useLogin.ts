"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
// import { USER_QUERY_KEY } from "@/hooks/useUser";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken, setTokenExpiresAt } = useAuth();

  const login = async (phone: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/auth/login",
        { phone, password },
        { requiresAuth: false }
      );

      const { user, access_token, expires_in } = res.data;
      const expiresAt = Date.now() + expires_in * 1000; // Convert seconds to milliseconds

      // Save token and user to Zustand
      setToken(access_token);
      setUser(user);
      setTokenExpiresAt(expiresAt);

      // Redirect to dashboard or previous page
      const redirectTo = sessionStorage.getItem("redirectPath");

      router.replace(redirectTo || "/dashboard");
      sessionStorage.removeItem("redirectPath");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, setUser, setToken, setTokenExpiresAt };
};

export default useLogin;
