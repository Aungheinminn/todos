import { deletePlan, editPlanById, postPlans } from "@/lib/plan.service";
import { PlanType } from "@/lib/types/plan.type";
import { useMutation, useQueryClient } from "react-query";

export const usePlanMutationsHook = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postPlans,
    onMutate: async (data: PlanType) => {
      await queryClient.cancelQueries("plans");

      const previousPlans = queryClient.getQueryData("plans");

      queryClient.setQueryData("plans", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("plans", context.previousPlans);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "plans" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlan,
    onMutate: async (data: string) => {
      await queryClient.cancelQueries("plans");

      const previousPlans = queryClient.getQueryData("plans");

      queryClient.setQueryData("plans", (old: any) =>
        old ? old.filter((o: any) => o._id === data) : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("plans", context.previousPlans);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "plans" }),
  });

  const editMutation = useMutation({
    mutationFn: editPlanById,
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries("plans");

      const previousPlans = queryClient.getQueryData("plans");

      queryClient.setQueryData("plans", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("plans", context.previousPlans);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "plans" }),
  });

  return {
    createMutation,
    deleteMutation,
    editMutation,
  };
};
