import { useSearchParams } from "next/navigation";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useInitiatePayment = () => {
  const queryClient = useQueryClient();

  type PaymentInfo = {
    amount: string;
    groupId: string;
    dueId: string;
  };

  const {
    data: payment,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async ({ paymentInfo }: { paymentInfo: PaymentInfo }) => {
      const res = await axios.post("/api/payments/initiate", {
        amount: paymentInfo.amount,
        group_id: paymentInfo.groupId,
        due_id: paymentInfo.dueId,
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate group list so new one shows up
      queryClient.invalidateQueries({ queryKey: ["groupMemberDues"] });
    },
  });
  return {
    mutate,
    payment,
    isPending,
  };
};

type PaymentReceiptResponse = {
  payment_reference: string;
  paid_at: Date;
  paidBy: string;
  amount: string;
  dues_title: string;
  group: string;
};

export const useGetPaymentReceipt = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const {
    data: paymentInfo,
    isLoading,
    isError,
    refetch,
  } = useQuery<PaymentReceiptResponse>({
    queryKey: ["payment-receipt"],
    queryFn: async () => {
      const res = await axios.get(`/api/payments/verify/${reference}`);
      return res.data;
    },
    enabled: !!reference,
  });

  return {
    paymentInfo,
    isLoading,
    isError,
    refetch,
  };
};
