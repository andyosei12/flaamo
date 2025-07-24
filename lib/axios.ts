import axios from "axios";
import { useAuth } from "@/stores/useAuth";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;

    // Only attach token if the request requires auth
    if (token && config.requiresAuth !== false) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
