import {
  createBudget,
  deleteAllEndedBudgets,
  deleteBudget,
  endBudget,
  updateBudget,
} from "@/lib/services/budget.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useBudgetMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error, variables, context: { previousItems?: unknown } | undefined) => {
      queryClient.setQueryData(["budgets"], context?.previousItems);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error, variables, context: { previousItems?: unknown } | undefined) => {
      queryClient.setQueryData(["budgets"], context?.previousItems);
    },
  });

  const endMutation = useMutation({
    mutationFn: endBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error, variables, context: { previousItems?: unknown } | undefined) => {
      queryClient.setQueryData(["budgets"], context?.previousItems);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["endedBudgets"] });
    },
    onError: (error, variables, context: { previousItems?: unknown } | undefined) => {
      queryClient.setQueryData(["budgets"], context?.previousItems);
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: deleteAllEndedBudgets,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["endedBudgets"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
  return {
    createMutation,
    editMutation,
    endMutation,
    deleteMutation,
    deleteAllMutation,
  };
};
