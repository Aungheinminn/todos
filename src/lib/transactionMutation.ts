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
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: "transactions" }),
  });

  const editMutation = useMutation({
    mutationFn: updateTransaction,
    onMutate: async (data: TransactionType) => {
      await queryClient.cancelQueries("transactions");
      const previousItems = queryClient.getQueryData("transactions");

      queryClient.setQueryData("transactions", (old: any) =>
        old
          ? old.map((t: TransactionType) => (t._id === data._id ? data : t))
          : [],
      );

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
    onMutate: async (data: TransactionType) => {
      await queryClient.cancelQueries("transactions");
      const previousItems = queryClient.getQueryData("transactions");

      queryClient.setQueryData("transactions", (old: any) =>
        old ? old.filter((t: TransactionType) => t._id !== data._id) : [],
      );

      return { previousItems };
    },
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
