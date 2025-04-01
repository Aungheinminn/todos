import { z } from "zod";
import { ObjectId } from "mongodb";

export const SharedWalletRequestSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
  status: z.string(),
  wallet_id: z.string(),
  inviter_id: z.string(),
  invitee_id: z.string(),
  created_at: z.string().optional()
}).strict();
