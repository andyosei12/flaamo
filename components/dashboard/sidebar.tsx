"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Settings, PlusSquare, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";
import LogoutButton from "../auth/LogoutBtn";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Groups", href: "/dashboard/groups", icon: Users },
  { label: "Create Group", href: "#", icon: PlusSquare },
  { label: "Settings", href: "#", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  // Auto-close sidebar on route change (mobile only)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 md:hidden",
          "transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "z-50 w-64 bg-background border-r p-6",
          "fixed md:static top-0 left-0",
          "flex flex-col justify-between",
          "h-full md:h-auto md:min-h-screen",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo & Close */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between -mb-6 -mt-12 dark:-mt-9 dark:-ml-3">
            <Logo />
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t">
          {user?.full_name && (
            <p className="text-sm text-muted-foreground mb-2 px-3">
              Logged in as{" "}
              <span className="font-medium text-foreground">
                {user?.full_name.split(" ")[0]}
              </span>
            </p>
          )}
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
