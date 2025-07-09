// components/dashboard/topbar.tsx
"use client";
import { User2 } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-14 w-full flex items-center justify-end px-4 bg-background border-b">
      {/* Right section — Avatar / Notifications */}
      <div className="flex items-center gap-3">
        {/* Placeholder avatar */}
        <button
          className=" hover:bg-muted p-2 rounded-full transition"
          aria-label="User-menu"
        >
          <User2 className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
