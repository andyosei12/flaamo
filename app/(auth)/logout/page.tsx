"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

const LogoutScreen = () => {
  const router = useRouter();
  const clearAuth = useAuth((state) => state.clearAuth);
  const queryClient = useQueryClient();
  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.clear();
      clearAuth();
      router.replace("/login");
    }, 1800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-background">
      {/* Logo or Branding */}
      <Image
        src="/logo.png" // Replace with your logo path
        alt="Flaamo Logo"
        width={48}
        height={48}
        className="mb-6 animate-fade-in"
      />

      {/* Goodbye message */}
      <h1 className="text-xl font-semibold text-foreground animate-in fade-in">
        Signing you out…
      </h1>
      <p className="text-sm text-muted-foreground mt-2 animate-in fade-in delay-200">
        Securely logging you out of Flaamo.
      </p>

      {/* Spinner */}
      <Loader2 className="w-6 h-6 mt-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default LogoutScreen;
