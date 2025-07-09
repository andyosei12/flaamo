"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
// import { USER_QUERY_KEY } from "@/hooks/useUser";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  const login = async (phone: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", { phone, password });

      const { user, access_token } = res.data;

      // Save token and user to Zustand
      setToken(access_token);
      setUser(user);

      // Redirect to dashboard
      router.replace("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
