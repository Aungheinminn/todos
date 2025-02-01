import { ObjectId } from "mongodb";
import { z } from "zod";
export const TransactionSchmea = z.object({
  _id: z.instanceof(ObjectId).optional(),
  wallet_id: z.string().min(1),
  transaction: z.number().min(1),
  user_id: z.string().min(1),
  category: z.string().min(1),
  note: z.string().optional(),
  transaction_day: z.number().min(1),
  transaction_month: z.number().min(1),
  transaction_year: z.number().min(1),
});
