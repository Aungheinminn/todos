import { z } from "zod";
export const TransactionSchme = z.object({
  _id: z.string().optional(),
  wallet_id: z.string(),
  transaction: z.number(),
  user_id: z.string(),
  category: z.string(),
  note: z.string(),
  transaction_day: z.number(),
  transaction_month: z.number(),
  transaction_year: z.number(),
});
