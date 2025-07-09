"use client";

import { Wallet, Users, CalendarCheck, AlertCircle } from "lucide-react";

const stats = [
  { icon: <Users className="text-brand" />, label: "Groups", value: 3 },
  {
    icon: <Wallet className="text-brand" />,
    label: "Total Contributed",
    value: "GHS 450",
  },
  {
    icon: <CalendarCheck className="text-brand" />,
    label: "Upcoming Dues",
    value: 2,
  },
  {
    icon: <AlertCircle className="text-brand" />,
    label: "Outstanding",
    value: "GHS 100",
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="p-4 rounded-lg bg-muted flex flex-col gap-1 min-w-0 shadow-sm"
        >
          <div className="mb-1">{s.icon}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <div className="text-lg font-semibold">{s.value}</div>
        </div>
      ))}
    </div>
  );
};
