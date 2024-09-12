import { z } from "zod";

export const RoutineSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    plan_id: z.string().min(1),
    user_id: z.string().min(1),
})

export type RoutineModel = z.infer<typeof RoutineSchema>;