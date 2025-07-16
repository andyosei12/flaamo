"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, LogIn } from "lucide-react";
import GroupList from "@/components/dashboard/group-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GroupsPage = () => {
  return (
    <section className="space-y-6">
      {/* Top Section: Heading + Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Groups</h1>

        {/* Mobile: Icons only */}
        <div className="flex md:hidden gap-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/groups/join">
                  <Button
                    size="icon"
                    variant="outline"
                    className="transition-all active:scale-95 hover:bg-muted/70 animate-in fade-in zoom-in duration-300"
                  >
                    <LogIn size={18} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">Join Group</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/groups/create">
                  <Button
                    size="icon"
                    variant="default"
                    className="transition-all active:scale-95 animate-in fade-in zoom-in duration-300"
                  >
                    <Plus size={18} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">Create Group</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Desktop: Full Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/dashboard/groups/join">
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

      {/* Group List */}
      <GroupList />
    </section>
  );
};

export default GroupsPage;
