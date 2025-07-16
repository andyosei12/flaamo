import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";

export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const res = await axios.post("/api/groups/join", { token });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Joined group successfully!");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to join group.";
      toast.error(message);
    },
  });
};
