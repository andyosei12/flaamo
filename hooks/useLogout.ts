import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuth((state) => state.clearAuth);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(); // clear Zustand state
    queryClient.clear(); // remove cached queries
    toast.success("You've been logged out.");
    router.replace("/login");
  };

  return handleLogout;
};
