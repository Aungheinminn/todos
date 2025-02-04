import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createWallet,
  deleteWallet,
  updateCurrentWallet,
  updateWallet,
} from "./wallet.service";
import { WalletType } from "./types/wallet.type";
export const useWalletMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createWallet,
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

  const editMutation = useMutation({
    mutationFn: updateWallet,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("wallets", context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "wallets" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWallet,
    onSettled: async (data, error, variables, context) => {
      if (data.success) {
        await queryClient.cancelQueries("wallets");

        const previousItems = queryClient.getQueryData("wallets");

        queryClient.setQueryData("wallets", (old: any) =>
          old ? old.filter((o: any) => o._id !== variables.wallet_id) : [],
        );

        return { previousItems };
      }
      console.log("after delete", data, error, context, variables);
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("wallets", context.previousItems);
    },
  });

  return {
    createMutation,
    updateCurrentWalletMutation,
    editMutation,
    deleteMutation,
  };
};
