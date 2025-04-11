import { createSharedWalletRequest } from "@/lib/services/sharedWalletRequest.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSharedWalletRequestMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSharedWalletRequest,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWalletRequests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  const

  return {
    createMutation,
  };
};
