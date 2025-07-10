"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, LogIn } from "lucide-react";
import GroupList from "@/components/dashboard/group-list";

const GroupsPage = () => {
  return (
    <section className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Heading / Title */}
        <h1 className="text-xl font-semibold">Groups</h1>

        {/* Actions */}
        <div className="flex gap-2 md:gap-3">
          {/* Mobile: Icons only */}
          <div className="flex md:hidden gap-2">
            <Link href="/dashboard/groups/create">
              <Button
                size="icon"
                variant="outline"
                className="transition-all active:scale-95 hover:bg-muted/70 animate-in fade-in zoom-in duration-300"
              >
                <span className="sr-only">Create Group</span>
                <Plus size={18} />
              </Button>
            </Link>
            <Link href="#">
              <Button
                size="icon"
                variant="outline"
                className="transition-all active:scale-95 hover:bg-muted/70 animate-in fade-in zoom-in duration-300"
              >
                <span className="sr-only">Join Group</span>
                <LogIn size={18} />
              </Button>
            </Link>
          </div>

          {/* Desktop: Full buttons */}
          <div className="hidden md:flex gap-2">
            <Link href="#">
              <Button variant="outline">
                <LogIn size={16} className="mr-2" />
                Join Group
              </Button>
            </Link>
            <Link href="/dashboard/groups/create">
              <Button>
                <Plus size={16} className="mr-2" />
                Create Group
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Group List */}
      <GroupList />
    </section>
  );
};

export default GroupsPage;
