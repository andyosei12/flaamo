import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("api/auth/me");
      return res.data.user;
    },
    staleTime: Infinity,
    retry: false,
  });

export const useGetUserContributionSummary = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-contribution-summary"],
    queryFn: async () => {
      const res = await axios.get("api/me/contribution-summary");
      return res.data;
    },
  });

  return { data, isLoading, isError };
};

type RecentActivities = {
  timestamp: string;
  description: string;
};

export const useGetRecentActivities = () => {
  const { data, isLoading, isError } = useQuery<RecentActivities[]>({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const res = await axios.get("api/me/recent-activities");
      const data = res.data;
      return data.recentActivities;
    },
  });

  return { data, isLoading, isError };
};

export const useGetUnpaidGroupDuesCount = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["unpaid-dues-count"],
    queryFn: async () => {
      const res = await axios.get("api/me/groups-with-unpaid-dues");
      const data = res.data;
      return data;
    },
  });

  return { data, isLoading, isError };
};
