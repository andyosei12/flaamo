"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Group = {
  id: string;
  name: string;
  created_at: string;
};

const GroupsPage = () => {
  const { data, isLoading, isError } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await axios.get("/api/groups");
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      {/* Top section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Groups</h2>
        <Link href="/dashboard/groups/create">
          <Button asChild>
            <span className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </span>
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
        </div>
      )}

      {/* Error or Empty State */}
      {!isLoading && (isError || !data || data.length === 0) && (
        <p className="text-sm text-muted-foreground">
          {isError
            ? "Failed to load groups. Try again later."
            : "You haven’t created or joined any groups yet."}
        </p>
      )}

      {/* Group List */}
      {!isLoading && data && data.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-brand">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Created on{" "}
                  {new Date(group.created_at).toLocaleDateString("en-GH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
