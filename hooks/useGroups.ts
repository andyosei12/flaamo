// hooks/useGroups.ts
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export interface Group {
  group_id: string;
  name: string;
  members_count: number;
  total_collected: number;
  role: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

interface GroupResponse {
  data: Group[];
  pagination: Pagination;
}

type UseGroupsProps = {
  page?: number;
  role?: "creator";
};

export const useGroups = ({ page = 1, role }: UseGroupsProps) => {
  return useQuery<GroupResponse>({
    queryKey: ["groups", page, role],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (role) params.set("role", role);

      const res = await axios.get(`/api/groups?page=${params.toString()}`);
      return res.data;
    },
    retry: false,
    staleTime: 60 * 1000, // optional: cache for 1 min
  });
};
