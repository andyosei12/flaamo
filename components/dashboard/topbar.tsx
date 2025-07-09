"use client";

import { Logo } from "@/components/dashboard/logo";
import ProfileSheet from "./profile-sheet";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-14 w-full flex items-center justify-between px-4 bg-background border-b">
      {/* Show logo only on mobile (md:hidden) */}
      <div className="md:hidden">
        <Logo />
      </div>

      {/* Right section — Avatar */}
      <div className="flex items-center gap-3 ml-auto">
        {/* <button
          className="hover:bg-muted p-2 rounded-full transition"
          aria-label="User-menu"
        >
          <User2 className="w-6 h-6 text-muted-foreground" />
        </button> */}
        <ProfileSheet />
      </div>
    </header>
  );
};

export default Topbar;
