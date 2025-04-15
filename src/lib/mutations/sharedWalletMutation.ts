import { createSharedWallet } from "@/lib/services/sharedWallet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useSharedWalletMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSharedWallet,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["requests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  return {
    createMutation,
  };
};
