"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setError] = useState("");
  //   const [success, setSuccess] = useState(false);

  const hasStartedTypingPassword = password.length > 0;
  const isPasswordValid = password.length >= 6;
  const doPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const canSubmit =
    isPasswordValid && doPasswordMatch && fullName && phone && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ full_name: fullName, phone, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Account created! OTP sent to your phone");
      // Redirect to OTP verification page
      router.push(`/verify?phone=${phone}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
      setPhone("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <Logo className="mx-auto mb-4" />

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-display font-semibold text-primary">
            Create your Flaamo account
          </h1>
          <p className="text-sm text-muted-foreground">Quick, easy & secure</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Yaw Mensah"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0241234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {hasStartedTypingPassword && (
            <div className="text-sm space-y-1 px-1">
              <p
                className={
                  isPasswordValid
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }
              >
                {isPasswordValid
                  ? "✓ Password is long enough"
                  : "✗ At least 6 characters required"}
              </p>
              <p
                className={
                  doPasswordMatch
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }
              >
                {doPasswordMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            </div>
          )}

          {/* {error && <p className="text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-green-600">Account created. OTP sent!</p>
          )} */}

          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer"
            disabled={!canSubmit}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:underline underline-offset-2"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
