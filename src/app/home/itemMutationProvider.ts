import { createItems } from "@/lib/items.service";
import { useMutation, useQueryClient } from "react-query";
export const ItemMutationProvider = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createItems,
    onMutate: async (data: any) => {
      await queryClient.cancelQueries("items");

      const previousItems = queryClient.getQueryData("items");

      queryClient.setQueryData("items", (old: any) =>
        old ? [...old, data] : [],
      );

     return { previousItems };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("items", context.previousItems);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: "items" }),
  });

  return {
    createMutation,
  };
};
