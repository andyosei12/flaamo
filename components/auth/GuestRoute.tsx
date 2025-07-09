"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/stores/useAuth";
import AuthLoader from "@/components/ui/loader";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: userFromMe, isLoading } = useUser();
  const zustandUser = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const user = userFromMe || zustandUser;

    // Sync the user to Zustand (if not already)
    if (userFromMe) setUser(userFromMe);

    // Handle redirect logic
    if (user) {
      if (user.verified_at) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    } else if (!isLoading) {
      setShouldRender(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromMe, isLoading]);

  // While loading or redirecting, show nothing (or loader)
  if (!shouldRender)
    return <AuthLoader title="Money matters - we no fit rush" />;

  return <>{children}</>;
};

export default GuestRoute;
