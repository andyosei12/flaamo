"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, CheckCircle2, User2 } from "lucide-react";
import { useAuth } from "@/stores/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import ThemeToggle from "../ui/theme-toggle";
import { useLogout } from "@/hooks/useLogout";

const ProfileMenu = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  const content = (
    <div className="space-y-6 py-4">
      {/* User Info */}
      <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-center gap-4">
        <div className="rounded-full bg-brand/10 text-brand p-2">
          <User2 className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <div className="font-semibold text-foreground">{user?.full_name}</div>
          {user?.phone && (
            <div className="text-muted-foreground text-xs">{user.phone}</div>
          )}
          {user?.verified_at && (
            <div className="flex items-center text-xs text-green-600 gap-1 mt-1">
              <CheckCircle2 size={12} /> Verified
            </div>
          )}
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-2 border-t pt-4">
        <ThemeToggle />

        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-left"
            onClick={() => setOpen(false)}
          >
            <Settings size={16} />
            Settings
          </Button>
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t pt-4">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={logout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );

  return isMobile ? (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger avatar button (mobile) */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <User2 className="w-6 h-6 text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-background text-foreground px-4 pt-4 pb-6"
      >
        {content}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger avatar button (desktop) */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User2 className="w-6 h-6 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogTitle className="sr-only">Profile Menu</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileMenu;
