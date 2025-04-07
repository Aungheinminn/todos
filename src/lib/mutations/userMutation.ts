import { createRefId } from "@/lib/services/users.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const createRefIdMutation = useMutation({
    mutationFn: createRefId,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["currentUser"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    createRefIdMutation,
  };
};
