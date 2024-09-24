import { z } from "zod";

export const PlanSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    user_id: z.string().min(1),
    createdAt: z.string().optional()
})

export type PlanModel = z.infer<typeof PlanSchema>;