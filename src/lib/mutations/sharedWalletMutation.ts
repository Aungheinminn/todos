import {
  createSharedWallet,
  makeSharedWalletAdmin,
  removeSharedWalletUser,
} from "@/lib/services/sharedWallet.service";
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

  const makeSharedWalletAdminMutation = useMutation({
    mutationFn: makeSharedWalletAdmin,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWalletUsers"], context.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["sharedWalletUsers"] });
    },
  });

  const leaveSharedWalletMutation = useMutation({
    mutationFn: removeSharedWalletUser,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWalletUsers"], context.previousItems);
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["sharedWalletUsers"] });
    },
  });

  const removeSharedWalletUserMutation = useMutation({
    mutationFn: removeSharedWalletUser,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWalletUsers"], context.previousItems);
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["sharedWalletUsers"] });
    },
  });

  return {
    createMutation,
    makeSharedWalletAdminMutation,
    leaveSharedWalletMutation,
    removeSharedWalletUserMutation,
  };
};
