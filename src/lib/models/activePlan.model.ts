import { z } from "zod";

export const PlanSchema = z.object({
    name: z.string(),
    icon: z.string().nullable().optional(),
    user_id: z.string(),
})

export type PlanModel = z.infer<typeof PlanSchema>;