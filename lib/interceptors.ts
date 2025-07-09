// lib/interceptors.ts
import axios from "./axios";
import { toast } from "sonner";
import { useAuth } from "@/stores/useAuth";

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        const message =
          error.response?.data?.message ||
          "Session expired. Please log in again.";

        toast.error(message);

        const logout = useAuth.getState().clearAuth;
        logout(); // Clears user + token from Zustand

        // Redirect to login
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};
