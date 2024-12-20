import { deleteNotification } from "@/lib/notifications.service";
import { useMutation, useQueryClient } from "react-query";
export const NotificationMutationProvider = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (data: string) => {
      await queryClient.cancelQueries("notifications");

      const previousPlans = queryClient.getQueryData("notifications");

      queryClient.setQueryData("notifications", (old: any) =>
        old ? old.filter((o: any) => o === data) : [],
      );

      return { previousPlans };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData("notifications", context.previousPlans);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: "notifications" }),
  });
	return {
		deleteMutation
	}
};
