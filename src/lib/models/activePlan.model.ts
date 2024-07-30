import { z } from "zod";

export const ActivePlanSchema = z.object({
    name: z.string(),
    icon: z.string().nullable(),
    userId: z.string(),
    routineId: z.string(),
})

export type ActivePlanModel = z.infer<typeof ActivePlanSchema>;