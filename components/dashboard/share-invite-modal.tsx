"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Loader2, Link2 } from "lucide-react";
import useInviteToken from "@/hooks/useInviteToken";

interface ShareInviteModalProps {
  groupId: string;
  open: boolean;
  onClose: () => void;
}

const ShareInviteModal = ({
  groupId,
  open,
  onClose,
}: ShareInviteModalProps) => {
  const { getToken, token, loading } = useInviteToken();
  const [copied, setCopied] = useState(false);

  const inviteUrl = token ? `${window.location.origin}/join/${token}` : "";

  useEffect(() => {
    if (open) {
      setCopied(false);
      getToken(groupId).catch(() =>
        toast.error("Failed to generate invite link")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, groupId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      toast.success("Invite link copied! 🚀");
    } catch {
      toast.error("Failed to copy invite link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 shadow-lg transition-colors duration-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Link2 size={20} />
            Share Group Invite
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-muted-foreground" size={24} />
          </div>
        ) : token ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Invite link</p>
              <div className="flex items-center gap-2">
                <Input
                  value={inviteUrl}
                  readOnly
                  className="bg-gray-100 dark:bg-zinc-800 text-sm"
                />
                <Button
                  onClick={handleCopy}
                  size="icon"
                  variant="outline"
                  className="border-gray-300 dark:border-zinc-600"
                >
                  <Copy size={18} />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Copied to clipboard
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-6 text-center">
            No invite link found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareInviteModal;
