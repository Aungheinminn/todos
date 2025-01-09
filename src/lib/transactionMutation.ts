import { useMutation, useQueryClient } from "react-query";
import { postTransactionByWallet } from "./transaction.service";
import { TransactionType } from "./types/transaction.type";

export const useTransactionMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postTransactionByWallet,
    onMutate: async (data: TransactionType) => {
      await queryClient.cancelQueries("transactions");
      const previousItems = queryClient.getQueryData("transactions");

      queryClient.setQueryData("transactions", (old: any) =>
        old ? [data, ...old] : [],
      );

      return { previousItems };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("transactions", context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "transactions" }),
  });
  return {
    createMutation
  }

};
