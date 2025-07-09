"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/stores/useAuth";
import AuthLoader from "@/components/ui/loader";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: userFromMe, isLoading } = useUser();
  const { user: zustandUser, setUser, token } = useAuth();
  const [checked, setChecked] = useState(false);

  const user = userFromMe || zustandUser;

  useEffect(() => {
    if (userFromMe) setUser(userFromMe); // keep zustand in sync

    if (!isLoading) {
      // ✅ Redirect only if logged in and verified
      if (token && user?.verified_at) {
        router.replace("/dashboard");
      } else {
        setChecked(true); // allow access to guest routes
      }
    }
  }, [token, user, userFromMe, isLoading, router, setUser]);

  if (!checked) {
    return <AuthLoader title="Loading good vibes..." />;
  }

  return <>{children}</>;
};

export default GuestRoute;
