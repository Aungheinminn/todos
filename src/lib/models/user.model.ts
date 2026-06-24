import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserSchema = z
  .object({
    _id: z.instanceof(ObjectId).optional(),
    refId: z.instanceof(ObjectId).optional(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    icon: z.string().nullable(),
  })
  .strict();

export const SignUpInputSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    icon: z.string().nullable(),
  })
  .strict();

export type UserModel = z.infer<typeof UserSchema>;
export type UserDocument = UserModel & { _id: ObjectId };
export type SignUpInput = z.infer<typeof SignUpInputSchema>;

export const CredentialSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CredentialModel = z.infer<typeof CredentialSchema>;
