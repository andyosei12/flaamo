"use client";

import { useAuth } from "@/stores/useAuth";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { MyGroups } from "@/components/dashboard/my-groups";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SmartCta } from "@/components/dashboard/smart-cta";

const DashboardPage = () => {
  const user = useAuth((s) => s.user);

  return (
    <div className="space-y-6 px-4 sm:px-6 py-6 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold">
        👋🏾 Welcome back, {user?.full_name || "friend"}!
      </h2>

      <StatsGrid />
      <MyGroups />
      <RecentActivity />
      <SmartCta />
    </div>
  );
};

export default DashboardPage;
