"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/stores/useAuth";
import AuthLoader from "../ui/loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: userFromMe, isLoading, isError } = useUser();
  const zustandUser = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const user = userFromMe || zustandUser;

  useEffect(() => {
    if (userFromMe) {
      setUser(userFromMe); // sync Zustand with `/me`
    }

    if (!user && isError) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userFromMe, isLoading, isError]);

  if (isLoading || !user) {
    return <AuthLoader title="Loading your Flaamo experience..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
