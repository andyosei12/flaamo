import axios from "./axios";
import { toast } from "sonner";
import { useAuth } from "@/stores/useAuth";

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      const config = error.config || {};
      const status = error.response?.status;

      if (status === 401 && config.requiresAuth !== false) {
        const logout = useAuth.getState().clearAuth;

        toast.error(
          error.response?.data?.message ||
            "Session expired. Please log in again."
        );

        logout(); // Clears token + user

        // Redirect to login
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};
