"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import useLogin from "@/hooks/useLogin";
import GuestRoute from "@/components/auth/GuestRoute";

export default function LoginPage() {
  //   const router = useRouter()
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);

  const { login, loading } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(phone, password);

      toast.success("Logged in successfully 🚀");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <GuestRoute>
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
        <div className="w-full max-w-sm space-y-6">
          <Logo className="mx-auto mb-4" />

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-display font-semibold text-primary">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to your Flaamo account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-brand font-medium hover:underline underline-offset-2"
              >
                Forgot password?
              </a>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary font-medium hover:underline underline-offset-2"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </GuestRoute>
  );
}
