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
    href: "#",
    icon: PlusSquare,
    label: "Create",
  },
  {
    href: "#",
    icon: Settings,
    label: "Settings",
  },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 inset-x-0 z-50",
        "backdrop-blur-md bg-background/60 supports-[backdrop-filter]:bg-background/50",
        "border-t border-border shadow-sm",
        "flex items-center justify-around py-2",
        "bg-white/60 dark:bg-[#0a0a0a]/60"
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
