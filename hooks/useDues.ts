import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface CreateDueInput {
  groupId: string;
  name: string;
  amount: number;
  due_date: string;
}

export const useCreateDues = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDueInput) => {
      const res = await axios.post(`/api/groups/${data.groupId}/dues`, {
        name: data.name,
        amount: data.amount,
        due_date: data.due_date,
      });
      return res.data;
    },
    onSuccess: () => {
      // Optional: invalidate dues list for this group
      queryClient.invalidateQueries({
        queryKey: ["group-dues"],
      });
      queryClient.invalidateQueries({
        queryKey: ["group-summary"],
      });
    },
  });
};
