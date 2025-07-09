"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateGroup } from "@/hooks/useCreateGroup";

const CreateGroupPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutate, isPending } = useCreateGroup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Group name is required");
      return;
    }

    mutate(name, {
      onSuccess: () => {
        toast.success("Group created!");
        router.push("/dashboard/groups");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create group");
      },
    });
  };

  return (
    <section className="max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Create a Group</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Group Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Rent Circle"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Group"}
        </Button>
      </form>
    </section>
  );
};

export default CreateGroupPage;
