"use client";

import { useGetUnpaidGroupDuesCount } from "@/hooks/useUser";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const SmartCta = () => {
  const { data, isLoading, isError } = useGetUnpaidGroupDuesCount();

  return (
    <div className="p-4 sm:p-5 bg-brand/10 border border-brand/20 rounded-md flex items-start gap-3 flex-col sm:flex-row">
      <AlertCircle className="text-brand" />

      {isLoading ? (
        <Skeleton className="h-4 w-3/4 sm:w-full" />
      ) : isError ? (
        <div className="text-sm text-red-500 leading-snug">
          Couldn’t load your unpaid dues summary.
        </div>
      ) : data?.groupsWithUnpaidDues === 0 ? (
        <div className="text-sm text-brand leading-snug">
          You’re all caught up! No unpaid dues at the moment.
        </div>
      ) : (
        <div className="text-sm text-brand leading-snug">
          You have unpaid dues in {data.groupsWithUnpaidDues}{" "}
          {data.groupsWithUnpaidDues === 1 ? "group" : "groups"}. Don’t forget
          to contribute this week.
        </div>
      )}
    </div>
  );
};
