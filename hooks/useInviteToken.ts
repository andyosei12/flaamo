"use client";

import { useState } from "react";
import axios from "@/lib/axios";

const useInviteToken = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const getToken = async (groupId: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/groups/${groupId}/generate-invite`);
      const { token } = res.data;
      setToken(token);
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to get token");
    } finally {
      setLoading(false);
    }
  };

  return { getToken, token, loading };
};

export default useInviteToken;
