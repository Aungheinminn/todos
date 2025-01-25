import { useMutation, useQueryClient } from "react-query";
import {
  createTransaction,
  deleteTransaction,
  duplicateTransaction,
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

  const duplicateMutation = useMutation({
    mutationFn: duplicateTransaction,
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
    duplicateMutation,
  };
};
