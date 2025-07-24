"use client";

import { useGroupMemberDues } from "@/hooks/useDues";
import { useInitiatePayment } from "@/hooks/usePayment";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

type DuesListSectionProps = {
  groupId: string;
};

export default function DuesListSection({ groupId }: DuesListSectionProps) {
  const [payingId, setPayingId] = useState<string | null>(null);
  const { duesList, isLoading } = useGroupMemberDues(groupId);
  const { mutate } = useInitiatePayment();

  const handlePay = (dueId: string, amount: string) => {
    setPayingId(dueId);
    mutate(
      {
        paymentInfo: {
          amount,
          dueId,
          groupId,
        },
      },
      {
        onSuccess: (url) => {
          window.location.href = url.authorization_url;
          setPayingId(dueId);
        },
        onError: () => {
          setPayingId(null);
          toast.error("Failed to initiate payment");
        },
      }
    );
  };

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Group Dues</h2>

      <div className="overflow-auto rounded-md border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Due Date</th>
              <th className="px-4 py-2 font-medium">Amount</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-14" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-8 w-20" />
                  </td>
                </tr>
              ))
            ) : duesList?.length ? (
              duesList.map(
                ({ due_name, status, due_date, due_id, due_amount }) => (
                  <tr key={due_id} className="border-t">
                    <td className="px-4 py-3">{due_name}</td>
                    <td className="px-4 py-3">
                      {format(new Date(due_date), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3">₵{due_amount}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        status === "paid" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {status === "paid" ? "Paid" : "Pending"}
                    </td>
                    <td className="px-4 py-3">
                      {status !== "paid" ? (
                        <Button
                          size="sm"
                          onClick={() => handlePay(due_id, due_amount)}
                          disabled={!!payingId}
                        >
                          {payingId === due_id ? "Processing..." : "Pay"}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-muted-foreground"
                >
                  No dues available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
