import { z } from "zod";

export const RoutineSchema = z.object({
    name: z.string(),
    icon: z.string().nullable().optional(),
    plan_id: z.string(),
    user_id: z.string(),
})

export type RoutineModel = z.infer<typeof RoutineSchema>;