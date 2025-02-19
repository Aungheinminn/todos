import { createBudget } from "@/lib/budget.service";
import { useMutation, useQueryClient } from "react-query";
export const useBudgetMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createBudget,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: "budgets" });
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("budgets", context.previousItems);
    },
  });
  return {
    createMutation,
  };
};
