import { ObjectId } from "mongodb";
import { z } from "zod";

export const WalletSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  wallet_name: z.string(),
  user_id: z.string(),
  createdAt: z.date().optional(),
  currency: z.string(),
  balance: z.number(),
  current: z.boolean(),
});
