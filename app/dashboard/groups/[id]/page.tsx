"use client";

import { useParams } from "next/navigation";
import GroupDetailsHeader from "@/components/dashboard/GroupDetailsHeader";
import GroupSummary from "@/components/dashboard/GroupSummary";
import { useGetGroupInfo } from "@/hooks/useGroups";
import Loader from "@/components/ui/loader";
import { useGroupSummary } from "@/hooks/useGroupSummary";
import GroupSummarySkeleton from "@/components/ui/group-summary-skeleton";

export default function GroupDetailPage() {
  const { id } = useParams() as { id: string };
  const { group, isLoading } = useGetGroupInfo();
  const { groupSummary, groupSummaryLoading } = useGroupSummary(id);

  return (
    <main className="min-h-screen p-4 sm:p-6">
      {isLoading || !group ? (
        <Loader title="Getting group details..." />
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <GroupDetailsHeader
            groupId={id}
            group={group}
            isLoading={isLoading}
          />

          {groupSummaryLoading || !groupSummary ? (
            <GroupSummarySkeleton />
          ) : (
            <GroupSummary
              totalDues={groupSummary.total_dues}
              totalCollected={groupSummary.total_collected}
              outstandingBalance={groupSummary.total_outstanding}
              role={group.role}
            />
          )}
        </div>
      )}
    </main>
  );
}
