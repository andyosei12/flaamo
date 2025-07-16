"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link2 } from "lucide-react";
import ShareInviteModal from "@/components/dashboard/share-invite-modal";
import axios from "@/lib/axios";

interface GroupInfo {
  name: string;
  role: "creator" | "member";
}

export default function GroupDetailPage() {
  const { id } = useParams() as { id: string };
  const [group, setGroup] = useState<GroupInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`/api/groups/${id}/user-info`);
        setGroup(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to load group details");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
              {group?.name}
            </h1>
          )}

          {group?.role === "creator" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setInviteOpen(true)}
              className="gap-2"
            >
              <Link2 size={16} />
              Share Invite
            </Button>
          )}
        </div>

        {/* Placeholder for future content */}
        {group?.name && (
          <div className="text-muted-foreground text-sm border rounded-lg p-4">
            This is where you’ll manage group members, dues, and analytics.
          </div>
        )}
      </div>

      {/* Share Invite Modal */}
      {group && (
        <ShareInviteModal
          open={inviteOpen}
          onClose={() => setInviteOpen(false)}
          groupId={id}
        />
      )}
    </main>
  );
}
