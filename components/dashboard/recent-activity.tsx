"use client";

import { useGetRecentActivities } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export const RecentActivity = () => {
  const { data: activities, isLoading, isError } = useGetRecentActivities();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Recent Activity</h3>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full sm:w-3/4" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex items-center space-x-2 text-red-500 text-sm">
          <AlertCircle size={16} />
          <span>Could not load recent activity</span>
        </div>
      ) : activities?.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent activity yet.</p>
      ) : (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {activities?.map((activity, i) => (
            <li
              key={i}
              className="border-l-2 border-brand pl-3 leading-snug text-xs sm:text-sm"
            >
              {activity.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
