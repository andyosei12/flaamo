import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

type GroupSummaryResponse = {
  total_dues: string;
  total_collected: string;
  total_outstanding: string;
};

export const useGroupSummary = (groupId: string) => {
  const { data: groupSummary, isLoading: groupSummaryLoading } =
    useQuery<GroupSummaryResponse>({
      queryKey: ["group-summary"],
      queryFn: async () => {
        const res = await axios.get(`/api/groups/${groupId}/summary`);
        return res.data;
      },
      enabled: !!groupId,
    });

  return {
    groupSummary,
    groupSummaryLoading,
  };
};
