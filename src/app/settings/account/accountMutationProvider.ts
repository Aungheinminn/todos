import {
  acceptLinking,
  declineLinking,
  postLinkedUser,
} from "@/lib/linkedUsers.service";
import { useMutation, useQueryClient } from "react-query";
export const AccountMutationProvider = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: postLinkedUser,
    onMutate: async (data: any) => {
      await queryClient.cancelQueries("linked_users");

      const previousItems = queryClient.getQueryData("linked_users");

      queryClient.setQueryData("linked_users", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousItems };
    },
  });
  const declineMutation = useMutation({
    mutationFn: declineLinking,
    onMutate: async (data: any) => {
      await queryClient.cancelQueries("linked_users");

      const previousItems = queryClient.getQueryData("linked_users");

      queryClient.setQueryData("linked_users", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousItems };
    },
  });

  const acceptMutation = useMutation({
    mutationFn: acceptLinking,
    onMutate: async (data: any) => {
      await queryClient.cancelQueries("linked_users");

      const previousItems = queryClient.getQueryData("linked_users");

      queryClient.setQueryData("linked_users", (old: any) =>
        old ? [...old, data] : [],
      );

      return { previousItems };
    },
  });

  return {
    createMutation,
    declineMutation,
    acceptMutation,
  };
};
