"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);

  // Animate progress bar
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [secondsLeft]);

  // Trigger redirect
  useEffect(() => {
    if (secondsLeft === 0) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center border rounded-lg shadow-sm p-8 bg-white dark:bg-muted">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="text-2xl font-bold mt-4">Payment Successful</h1>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Redirecting to your dashboard in{" "}
          <span className="font-medium">{secondsLeft}s</span>…
        </p>

        <div className="w-full h-2 bg-muted-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
