import { z } from "zod";

export const LinkedUserSchema = z.object({
  user_id: z.string(),
  linked_user_id: z.string(),
});
