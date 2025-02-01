import { ObjectId } from "mongodb";
import { z } from "zod";

export const WalletSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  wallet_name: z.string().min(1),
  user_id: z.string().min(1),
  createdAt: z.date().optional(),
  currency: z.string().min(1),
  balance: z.number(),
  current: z.boolean(),
});
