"use client";

import { User2 } from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-14 flex items-center justify-end px-4 sm:px-6">
      <button
        className="hover:bg-muted p-2 rounded-full transition"
        aria-label="User menu"
      >
        <User2 className="w-6 h-6 text-muted-foreground" />
      </button>
    </div>
  );
};

export default Topbar;
