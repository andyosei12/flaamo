import { useQueryClient, useMutation } from "@tanstack/react-query";
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
