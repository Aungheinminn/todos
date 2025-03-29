import { z } from "zod";
import { ObjectId } from "mongodb";

export const NotificationSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
  type: z.string(),
  status: z.string(),
  from: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
  to: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
  content: z.record(z.any()),
  last_seen: z.string()
});
