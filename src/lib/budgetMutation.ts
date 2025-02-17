import { createBudget } from "@/lib/budget.service";
import { useMutation, useQueryClient } from "react-query";
export const useBudgetMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createBudget,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("budgets", context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "budgets" }),
  });
  return {
    createMutation
  };
};
