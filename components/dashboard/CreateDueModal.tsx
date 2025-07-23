"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateDues } from "@/hooks/useDues";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateDueModalProps = {
  open: boolean;
  onClose: () => void;
  groupId: string;
};

export default function CreateDueModal({
  open,
  onClose,
  groupId,
}: CreateDueModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { mutate, isPending } = useCreateDues();

  const handleSubmit = async () => {
    if (!name || !amount || !dueDate) return;

    mutate(
      { groupId, name, amount: parseFloat(amount), due_date: dueDate },
      {
        onSuccess: () => {
          toast.success("Dues created successfully");
          setAmount("");
          setName("");
          setDueDate("");
          onClose();
        },

        onError: (err) => {
          console.log(err);
          toast.error("Dues creation failed");
        },
      }
    );
  };

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Due</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label htmlFor="name">Due Name</Label>
            <Input
              id="name"
              placeholder="e.g., August Welfare"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="amount">Amount (GHS)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              placeholder="e.g., 50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              min={today}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !name || !amount || !dueDate}
          >
            {isPending ? "Creating..." : "Create Due"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
