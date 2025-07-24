"use client";

import { useGetUserContributionSummary } from "@/hooks/useUser";
import { Wallet, Users, CalendarCheck, AlertCircle } from "lucide-react";

export const StatsGrid = () => {
  const { data, isLoading, isError } = useGetUserContributionSummary();

  const statClass =
    "p-4 rounded-lg bg-muted flex flex-col gap-1 min-w-0 shadow-sm";

  if (isError) {
    return (
      <div className="text-center text-sm text-destructive bg-muted p-4 rounded-md shadow-sm">
        Something went wrong loading your contribution summary.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className={statClass}>
        <div className="mb-1">
          <Users className="text-brand" />
        </div>
        <div className="text-xs text-muted-foreground">Groups</div>
        <div className="text-lg font-semibold">
          {isLoading ? <Skeleton /> : data.total_groups}
        </div>
      </div>

      <div className={statClass}>
        <div className="mb-1">
          <Wallet className="text-brand" />
        </div>
        <div className="text-xs text-muted-foreground">Total Contributed</div>
        <div className="text-lg font-semibold">
          {isLoading ? <Skeleton /> : `GHS ${data.total_contributed}`}
        </div>
      </div>

      <div className={statClass}>
        <div className="mb-1">
          <CalendarCheck className="text-brand" />
        </div>
        <div className="text-xs text-muted-foreground">Upcoming Dues</div>
        <div className="text-lg font-semibold">
          {isLoading ? <Skeleton /> : data.upcoming_dues_count}
        </div>
      </div>

      <div className={statClass}>
        <div className="mb-1">
          <AlertCircle className="text-brand" />
        </div>
        <div className="text-xs text-muted-foreground">Outstanding Dues</div>
        <div className="text-lg font-semibold">
          {isLoading ? <Skeleton /> : `GHS ${data.outstanding_amount}`}
        </div>
      </div>
    </div>
  );
};

// Skeleton component (optional, but reusable)
const Skeleton = () => (
  <div className="h-5 w-20 bg-muted-foreground/20 rounded animate-pulse" />
);
