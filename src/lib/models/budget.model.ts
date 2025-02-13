import { ObjectId } from "mongodb";
import { z } from "zod";

export const BudgetSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(1),
  user_id: z.string().min(1),
  wallet_id: z.string().min(1),
  budget: z.number().min(1),
  category: z.string().min(1),
  range: z.string().min(1),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  createdAt: z.string().optional(),
})
