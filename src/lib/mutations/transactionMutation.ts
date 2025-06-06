import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  duplicateTransaction,
  updateTransaction,
} from "@/lib/services/transaction.service";

export const useTransactionMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["transactions"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["top-usage-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["currentWallet"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: updateTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["transactions"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["currentWallet"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["transactions"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["currentWallet"] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: duplicateTransaction,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["transactions"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["currentWallet"] });
    },
  });
  return {
    createMutation,
    editMutation,
    deleteMutation,
    duplicateMutation,
  };
};
