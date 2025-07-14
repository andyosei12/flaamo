"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "sonner";
import useLogin from "@/hooks/useLogin";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const { setUser, setToken, setTokenExpiresAt } = useLogin();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const pendingUser = sessionStorage.getItem("pendingUser");

    if (!pendingUser) {
      toast.error("No pending registration found");
      setLoading(false);
      return;
    }
    const { password } = JSON.parse(pendingUser);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid OTP");
      }
      const { user, access_token, expires_in } = data;
      setToken(access_token);
      setUser(user);
      setTokenExpiresAt(Date.now() + expires_in * 1000); // Set token expiry to 1 hour from now

      sessionStorage.removeItem("pendingUser");
      toast.success("Account verified successfully 🎉");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/resend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to resend OTP");

      toast.success("OTP resent successfully 📩");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Could not resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <Logo className="mx-auto mb-4" />

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-display font-semibold text-primary">
            Verify your number
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {phone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={handleResend}
            className="text-sm text-primary hover:underline underline-offset-2"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </main>
  );
}
