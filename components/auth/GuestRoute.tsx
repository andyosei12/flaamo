"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import AuthLoader from "@/components/ui/loader";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isAuthenticated()) {
      router.replace("/dashboard");
    } else {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return <AuthLoader title="Money matters - we no fit rush" />;
  }

  return <>{children}</>;
};

export default GuestRoute;
