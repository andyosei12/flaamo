"use client";

import Link from "next/link";
import { useGetGroups } from "@/hooks/useGroups";
import { ArrowRight, AlertTriangle } from "lucide-react";

export const MyGroups = () => {
  const { data, isLoading, isError } = useGetGroups({ limit: 4 });
  const groups = data?.data || [];
  const hasGroups = groups.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Groups</h3>
        {hasGroups && (
          <Link
            href="/dashboard/groups"
            className="text-sm text-brand flex items-center hover:underline"
          >
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[220px] h-[80px] bg-muted rounded-lg animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-sm text-red-600 flex items-center gap-2 px-4">
          <AlertTriangle className="h-4 w-4" />
          Failed to load groups. Please try again.
        </div>
      )}

      {!isLoading && !isError && !hasGroups && (
        <div className="text-sm text-muted-foreground px-4">
          You haven’t joined or created any groups yet.
        </div>
      )}

      {!isLoading && !isError && hasGroups && (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {groups.map((g) => (
            <div
              key={g.name}
              className="min-w-[220px] flex-shrink-0 p-4 bg-background border rounded-lg shadow-sm"
            >
              <div className="font-semibold text-sm truncate">{g.name}</div>
              <div className="text-xs text-muted-foreground">{g.role}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
