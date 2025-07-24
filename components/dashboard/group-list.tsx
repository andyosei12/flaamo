"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGroups } from "@/hooks/useGroups";

const GroupList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "creator">("all");

  const { data, isLoading, isFetching } = useGetGroups({
    page,
    role: filter === "creator" ? "creator" : undefined,
  });

  const groups = data?.data || [];
  const pagination = data?.pagination;

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= (pagination?.total_pages || 1);

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
        >
          All Groups
        </Button>
        <Button
          variant={filter === "creator" ? "default" : "outline"}
          onClick={() => {
            setFilter("creator");
            setPage(1);
          }}
        >
          Created by Me
        </Button>
      </div>

      {/* Group List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 text-sm">
          No groups found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block rounded-lg border overflow-hidden">
            <div className="grid grid-cols-4 font-medium text-sm px-4 py-2 bg-muted text-muted-foreground">
              <div>Name</div>
              <div className="text-center">Members</div>
              <div className="text-center">Amount Collected</div>
              <div className="text-center">Role</div>
            </div>

            {groups.map((group) => (
              <div
                key={group.group_id}
                className="grid grid-cols-4 px-4 py-3 border-t items-center text-sm hover:bg-accent/30 transition cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/groups/${group.group_id}`)
                }
              >
                <div>{group.name}</div>
                <div className="text-center">{group.members_count}</div>
                <div className="text-center">₵ {group.total_collected}</div>
                <div className="text-center capitalize">{group.role}</div>
              </div>
            ))}
          </div>

          {/* Mobile List */}
          <div className="sm:hidden space-y-4">
            {groups.map((group) => (
              <div
                key={group.group_id}
                className="border rounded-lg p-4 space-y-2 text-sm hover:bg-accent/30 transition cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/groups/${group.group_id}`)
                }
              >
                <div className="font-medium text-foreground">{group.name}</div>
                <div className="text-muted-foreground">
                  <span className="font-semibold">Members:</span>{" "}
                  {group.members_count}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-semibold">Amount Collected:</span> ₵{" "}
                  {group.total_collected}
                </div>
                <div className="text-muted-foreground capitalize">
                  <span className="font-semibold">Role:</span> {group.role}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={isPrevDisabled || isLoading || isFetching}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft size={16} className="mr-1" />
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.total_pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={isNextDisabled || isLoading || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupList;
