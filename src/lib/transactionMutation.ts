import { useMutation, useQueryClient } from "react-query";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./transaction.service";
import { TransactionType } from "./types/transaction.type";

export const useTransactionMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("transactions", context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: "transactions" }),
  });

  const editMutation = useMutation({
    mutationFn: updateTransaction,
    onMutate: async (data: TransactionType) => {
      await queryClient.cancelQueries("transactions");
      const previousItems = queryClient.getQueryData("transactions");

      queryClient.setQueryData<TransactionType>("transactions", (old) => {
        if (!old) return data;
        return old._id === data._id ? data : old;
      });

      return { previousItems };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("transactions", context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: "transactions" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("transactions", context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: "transactions" }),
  });
  return {
    createMutation,
    editMutation,
    deleteMutation,
  };
};
