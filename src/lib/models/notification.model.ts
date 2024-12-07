import { z } from "zod";

export const NotificationSchema = z.object({
  type: z.string(),
  user_id: z.string(),
  status: z.string(),
  from: z.string(),
  content: z.record(z.any()),
});
