import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createWallet,
  deleteWallet,
  updateCurrentWallet,
} from "./wallet.service";
import { WalletType } from "./types/wallet.type";
export const useWalletMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createWallet,
    onMutate: async (data: WalletType) => {
      console.log("wallet mutation", data);
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
    mutationFn: updateCurrentWallet,
    onMutate: async (data: any) => {
      console.log("wallet mutation", data);
      await queryClient.cancelQueries("wallets");

      const previousItems = queryClient.getQueryData("wallets");

      const updatedCurrentWallet = (previousItems as any).find(
        (w: WalletType) => w._id === data.wallet_id,
      );

      queryClient.setQueryData("wallets", (old: any) =>
        old
          ? old.map((w: WalletType) =>
              w._id === data.wallet_id
                ? { ...updatedCurrentWallet, current: true }
                : { ...w, current: false },
            )
          : [],
      );

      return { previousItems };
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWallet,
    onMutate: async (data: string) => {
      await queryClient.cancelQueries("wallets");

      const previousItems = queryClient.getQueryData("wallets");

      queryClient.setQueryData("wallets", (old: any) =>
        old ? old.filter((o: any) => o._id !== data) : [],
      );

      return { previousItems };
    },
  });

  return {
    createMutation,
    updateCurrentWalletMutation,
    deleteMutation,
  };
};
