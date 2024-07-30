import { z } from "zod";

export const RoutineSchema = z.object({
    name: z.string(),
    icon: z.string().nullable(),
    userId: z.string(),
})

export type RoutineModel = z.infer<typeof RoutineSchema>;