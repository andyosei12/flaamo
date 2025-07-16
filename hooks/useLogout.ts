import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuth((state) => state.clearAuth);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear(); // remove cached queries
    toast.success("You've been logged out.");
    setTimeout(() => {
      logout(); // clear Zustand state
    }, 50);
    sessionStorage.clear();
    router.replace("/login");
    window.location.reload();
  };

  return handleLogout;
};
