import { z } from "zod";

export const PlanSchema = z.object({
    name: z.string().min(1),
    icon: z.string().nullable().optional(),
    user_id: z.string().min(1),
})

export type PlanModel = z.infer<typeof PlanSchema>;