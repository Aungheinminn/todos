import { createSharedWallet } from "@/lib/services/sharedWallet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useSharedWalletMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSharedWallet,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWallets"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWallets"] }),
  });

  return {
    createMutation,
  };
};
