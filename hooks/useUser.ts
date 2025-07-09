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
