import {
  acceptLinking,
  declineLinking,
  postLinkedUser,
} from "@/lib/linkedUsers.service";
import { useMutation } from "react-query";

export const AccountMutationProvider = () => {
  const createMutation = useMutation({
    mutationFn: postLinkedUser,
  });
  const declineMutation = useMutation({
    mutationFn: declineLinking,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptLinking,
  });

  return {
    createMutation,
    declineMutation,
    acceptMutation,
  };
};
