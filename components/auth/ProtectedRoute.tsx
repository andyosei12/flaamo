"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import AuthLoader from "@/components/ui/loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, clearAuth } = useAuth();

  const search = typeof window !== "undefined" ? window.location.search : "";

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isAuthenticated()) {
      sessionStorage.setItem("redirectPath", pathname + search);
      clearAuth();
      router.replace("/login");
    } else {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return <AuthLoader title="Loading your Flaamo experience..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
