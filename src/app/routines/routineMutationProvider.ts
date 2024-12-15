import { createRoutine, deleteRoutine } from "@/lib/routines.service";
import { RoutineType } from "@/lib/types/routine.type";
import { useMutation, useQueryClient } from "react-query";

export const useRoutineMutationHook = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createRoutine,
    onMutate: async (data: RoutineType) => {
      await queryClient.cancelQueries("routines");

      const previousPlans = queryClient.getQueryData("routines");

      queryClient.setQueryData("routines", (old: any) =>
        old ? [data, ...old] : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("routines", context.previousPlans);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "routines" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRoutine,
    onMutate: async (data: string) => {
      await queryClient.cancelQueries("routines");

      const previousPlans = queryClient.getQueryData("routines");

      queryClient.setQueryData("routines", (old: any) =>
        old ? old.filter((o: any) => o === data) : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("routines", context.previousPlans);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "routines" }),
  });

  return {
    createMutation,
    deleteMutation,
  };
};

