import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareInviteModal from "./share-invite-modal";
import { useGetGroupInfo } from "@/hooks/useGroups";
import { Share2, PlusCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import CreateDueModal from "./CreateDueModal";

const GroupHeader = ({ groupId }: { groupId: string }) => {
  const { group, isLoading } = useGetGroupInfo();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [createDueOpen, setCreateDueOpen] = useState(false);

  if (isLoading || !group) return <Skeleton className="h-8 w-2/3" />;

  const isCreator = group.role === "creator";

  return (
    <header className="w-full border-b pb-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Group Title Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {group.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {group.members_count} member{group.members_count !== 1 && "s"}
          </p>
        </div>

        {/* Action Buttons */}
        {isCreator && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              size="sm"
              onClick={() => setInviteOpen(true)}
            >
              <Share2 size={16} />
              Share Invite
            </Button>

            <Button
              className="flex items-center gap-1"
              size="sm"
              onClick={() => setCreateDueOpen(true)}
            >
              <PlusCircle size={16} />
              Create Due
            </Button>
          </div>
        )}
      </div>

      <ShareInviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        groupId={groupId}
      />

      <CreateDueModal
        open={createDueOpen}
        onClose={() => setCreateDueOpen(false)}
        groupId={groupId}
      />
    </header>
  );
};

export default GroupHeader;
