// lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("flaamo-auth") : null;

  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    } catch {}
  }

  return config;
});

export default instance;
