"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const res = await axios.post("/api/groups", { name });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate group list so new one shows up
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
