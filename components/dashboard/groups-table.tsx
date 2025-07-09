"use client";

import { BadgeCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dummyGroups = [
  {
    id: "grp1",
    name: "Chale Savings Squad",
    role: "Creator",
    dues: "₵50 monthly",
    nextDue: "Aug 1, 2025",
    members: 12,
    status: "up-to-date",
  },
  {
    id: "grp2",
    name: "Ahenfie Boys",
    role: "Member",
    dues: "₵30 weekly",
    nextDue: "Jul 13, 2025",
    members: 8,
    status: "owing",
  },
];

const GroupsTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium whitespace-nowrap">Group</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Dues</th>
            <th className="px-4 py-3 font-medium">Next Due</th>
            <th className="px-4 py-3 font-medium">Members</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {dummyGroups.map((group) => (
            <tr
              key={group.id}
              className="border-t hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{group.name}</td>

              <td className="px-4 py-3">
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    group.role === "Creator"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  )}
                >
                  {group.role}
                </span>
              </td>

              <td className="px-4 py-3">{group.dues}</td>
              <td className="px-4 py-3">{group.nextDue}</td>
              <td className="px-4 py-3">{group.members}</td>

              <td className="px-4 py-3">
                {group.status === "up-to-date" ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <BadgeCheck className="w-4 h-4" /> Up to date
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                    <AlertCircle className="w-4 h-4" /> Owing
                  </span>
                )}
              </td>

              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="secondary" size="sm">
                  Pay
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;
