// Next.js 15 – app/page.tsx
// Flaamo landing page with framer-motion animations and animated hero background

"use client";

import {
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    icon: BellAlertIcon,
    title: "No Chasing",
    desc: "Automated reminders make follow‑ups effortless.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "WhatsApp Friendly",
    desc: "Invite members and send alerts via WhatsApp.",
  },
  {
    icon: ChartBarSquareIcon,
    title: "Real‑Time Tracking",
    desc: "See who’s paid and what’s pending instantly.",
  },
  {
    icon: GlobeAmericasIcon,
    title: "Built for Ghana",
    desc: "Mobile money ready, culturally tuned.",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen w-full font-sans bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-32 text-white text-center overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, var(--flaamo-primary) 0%, var(--flaamo-accent) 100%)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold font-display leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Manage Group Dues Without Stress
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl font-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Flaamo helps your squad stay consistent with contributions, dues,
            and one‑time payments — all in one place.
          </motion.p>

          {/* Waitlist Form */}
          <div className="w-full max-w-xl bg-white/90 dark:bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
            {status === "success" ? (
              <p className="text-center text-green-600 font-medium">
                🎉 You’re on the list! You will be notified when we go live.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[var(--flaamo-primary)] focus:outline-none"
                />
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="bg-[var(--flaamo-primary)] text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
                >
                  {status === "loading" ? "Please wait…" : "Join Waitlist"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-red-500 text-sm">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {features.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              className="bg-[var(--color-background)] border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Icon className="w-10 h-10 text-[var(--flaamo-primary)] mb-4" />
              <h3 className="text-xl font-semibold font-display mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500">
        <p>Made in Ghana 🇬🇭 with love – © {new Date().getFullYear()} Flaamo</p>
      </footer>
    </main>
  );
}
