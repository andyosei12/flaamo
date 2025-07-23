"use client";

import { useParams } from "next/navigation";
import GroupDetailsHeader from "@/components/dashboard/GroupDetailsHeader";

export default function GroupDetailPage() {
  const { id } = useParams() as { id: string };

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <GroupDetailsHeader groupId={id} />
      </div>
    </main>
  );
}
