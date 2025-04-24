import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWallet,
  deleteWallet,
  updateCurrentWallet,
  updateWallet,
} from "@/lib/services/wallet.service";
export const useWalletMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createWallet,
    onError: (error, variables, context: any) => {

      queryClient.setQueryData(["wallets"], context.previousItems);
    },
    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: ["currentWallet"] });
queryClient.invalidateQueries({ queryKey: ["wallets"] })
    } 
  });

  const updateCurrentWalletMutation = useMutation({
    mutationFn: updateCurrentWallet,
    onSettled: () => {

    queryClient.invalidateQueries({ queryKey: ["wallets"] })
    queryClient.invalidateQueries({ queryKey: ["sharedWallets"] })
    } 
  });

  const editMutation = useMutation({
    mutationFn: updateWallet,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["wallets"], context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWallet,
    onSettled:() =>
       queryClient.invalidateQueries({ queryKey: ["wallets"] }),
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["wallets"], context.previousItems);
    },
  });

  return {
    createMutation,
    updateCurrentWalletMutation,
    editMutation,
    deleteMutation,
  };
};
