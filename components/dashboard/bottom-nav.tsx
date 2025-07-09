// components/dashboard/bottom-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, PlusSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Home",
  },
  {
    href: "/dashboard/groups",
    icon: Users,
    label: "Groups",
  },
  {
    href: "/groups/create",
    icon: PlusSquare,
    label: "Create",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto flex justify-between rounded-xl border border-border bg-background/60 p-2 backdrop-blur-md shadow-xl",
        "max-w-sm", // Optional: limits nav bar width
        "supports-[padding:max(0px)_env(safe-area-inset-bottom)]"
      )}
    >
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center text-xs transition-all duration-200",
              "active:scale-95",
              isActive
                ? "text-brand font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-all duration-200",
                isActive && "stroke-[2.5]"
              )}
            />
            <span className="mt-1">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
