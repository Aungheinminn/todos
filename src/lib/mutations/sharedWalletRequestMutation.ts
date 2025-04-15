import {
  acceptSharedWalletRequest,
  createSharedWalletRequest,
  declineSharedWalletRequest,
  deleteSharedWalletRequest,
} from "@/lib/services/sharedWalletRequest.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSharedWalletRequestMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSharedWalletRequest,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["requests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  const acceptMutation = useMutation({
    mutationFn: acceptSharedWalletRequest,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["requests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  const declineMutation = useMutation({
    mutationFn: declineSharedWalletRequest,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["requests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSharedWalletRequest,
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["sharedWalletRequests"], context.previousItems);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["sharedWalletRequests"] }),
  });

  return {
    createMutation,
    acceptMutation,
    declineMutation,
    deleteMutation,
  };
};
