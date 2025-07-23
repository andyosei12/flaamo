/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useJoinGroup } from "@/hooks/useGroups";
import { CheckCircle, Users, Loader2 } from "lucide-react";
import Logo from "@/components/logo";

const JoinGroupPage = () => {
  const { token } = useParams() as { token: string };
  const router = useRouter();
  const [group, setGroup] = useState<null | {
    name: string;
    members_count: number;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/preview/${token}`
        );
        const data = await res.json();
        setGroup(data.group);
      } catch {
        toast.error("Invalid or expired invite token");
        router.replace("/dashboard/groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, []);

  const { mutate: joinGroup, isPending } = useJoinGroup();

  const handleJoin = () => {
    joinGroup(token, {
      onSuccess: () => {
        router.push("/dashboard/groups");
      },
      onError: () => {
        router.replace("/dashboard/groups");
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-muted/50 dark:from-[#0f0f0f] dark:to-[#121212] transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-lg p-6 transition-colors duration-300">
        <div className="flex justify-center mb-5">
          <Logo className="h-10" />
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <Users size={20} />
                Join Group
              </h2>
              <p className="text-sm text-muted-foreground">
                You’re about to join:
              </p>
              <p className="text-lg font-bold text-primary mt-1">
                {group?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {group?.members_count} member
                {group?.members_count !== 1 ? "s" : ""}
              </p>
            </div>

            <Button
              onClick={handleJoin}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Joining...
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Join Group
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </main>
  );
};

export default JoinGroupPage;
