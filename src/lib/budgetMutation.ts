import { createBudget, deleteBudget } from "@/lib/budget.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useBudgetMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["budgets"], context.previousItems);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["budgets"], context.previousItems);
    },
  });
  return {
    createMutation,
    deleteMutation,
  };
};
