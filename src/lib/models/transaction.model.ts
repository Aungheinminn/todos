import { ObjectId } from "mongodb";
import { z } from "zod";
export const TransactionSchmea = z.object({
  _id: z.union([z.instanceof(ObjectId), z.string()]).optional(),
  wallet_id: z.string(),
  transaction: z.number(),
  user_id: z.string(),
  category: z.string(),
  note: z.string().optional(),
  transaction_day: z.number(),
  transaction_month: z.number(),
  transaction_year: z.number(),
});
