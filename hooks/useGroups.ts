// hooks/useGroups.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

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
  limit?: number;
  page?: number;
  role?: "creator";
};

export const useGetGroups = ({
  page = 1,
  limit = 10,
  role,
}: UseGroupsProps) => {
  return useQuery<GroupResponse>({
    queryKey: ["groups", page, role, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (role) params.set("role", role);

      const res = await axios.get(`/api/groups?${params.toString()}`);
      return res.data;
    },
    retry: false,
    staleTime: 60 * 1000, // optional: cache for 1 min
  });
};

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

type GroupInfoResponse = {
  name: string;
  role: string;
  members_count: number;
};

export const useGetGroupInfo = () => {
  const params = useParams();
  const groupId = params?.id as string;

  const {
    data: group,
    isLoading,
    isError,
    refetch,
  } = useQuery<GroupInfoResponse>({
    queryKey: ["groupUserInfo"],
    queryFn: async () => {
      const res = await axios.get(`/api/groups/${groupId}/user-info`);
      return res.data;
    },
    enabled: !!groupId,
  });

  return {
    group,
    isLoading,
    isError,
    refetch,
  };
};
