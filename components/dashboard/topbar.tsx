// components/dashboard/topbar.tsx
"use client";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-14 w-full flex items-center justify-end px-4 bg-background border-b">
      {/* Right section — Avatar / Notifications */}
      <div className="flex items-center gap-3">
        {/* Placeholder avatar */}
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium text-muted-foreground">
          U
        </div>
      </div>
    </header>
  );
};

export default Topbar;
