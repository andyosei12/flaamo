import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({
        queryKey: ["groupMemberDues"],
      });
    },
  });
};

type GroupMemberDuesResponse = {
  due_id: string;
  due_name: string;
  due_amount: string;
  due_date: string;
  status: string;
};
export const useGroupMemberDues = (groupId: string) => {
  const {
    data: duesList,
    isLoading,
    isError,
  } = useQuery<GroupMemberDuesResponse[]>({
    queryKey: ["groupMemberDues"],
    queryFn: async () => {
      const res = await axios.get(`/api/groups/${groupId}/dues-progress`);
      return res.data;
    },
    enabled: !!groupId,
  });

  return {
    duesList,
    isLoading,
    isError,
  };
};
