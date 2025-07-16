"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useJoinGroup } from "@/hooks/useJoinGroup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const JoinGroupPage = () => {
  const searchParams = useSearchParams();
  const tokenFromURL = searchParams.get("token") || "";
  const [token, setToken] = useState(tokenFromURL);
  const router = useRouter();

  const { mutate: joinGroup, isPending } = useJoinGroup();

  useEffect(() => {
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [tokenFromURL]);

  const handleJoin = () => {
    if (!token) return;
    joinGroup(token, {
      onSuccess: () => router.push("/dashboard/groups"),
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6 mt-12 px-4">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">Join a Group</h1>
        <p className="text-sm text-muted-foreground">
          Paste your group token below or use an invite link.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter group token"
          disabled={isPending}
        />

        <Button
          onClick={handleJoin}
          disabled={!token || isPending}
          className="w-full"
        >
          {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
          Join Group
        </Button>
      </div>
    </div>
  );
};

export default JoinGroupPage;
