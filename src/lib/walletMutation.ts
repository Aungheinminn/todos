import { useMutation, useQuery, useQueryClient } from "react-query";
import { createWallet, updateCurrentWallet } from "./wallet.service";
import { WalletType } from "./types/wallet.type";
export const useWalletMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createWallet,
    onMutate: async (data: WalletType) => {
      console.log('wallet mutation', data);
      await queryClient.cancelQueries("wallets");

      const previousItems = queryClient.getQueryData("wallets");

      queryClient.setQueryData("wallets", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousItems };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("wallets", context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "wallets" }),
  });

  const updateCurrentWalletMutation = useMutation({
    mutationFn: updateCurrentWallet 
  })

  return {
    createMutation,
    updateCurrentWalletMutation
  };
};
