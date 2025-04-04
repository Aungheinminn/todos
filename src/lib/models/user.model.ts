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

export type UserModel = z.infer<typeof UserSchema>;
export type UserDocument = UserModel & { _id: ObjectId };

export const CredentialSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CredentialModel = z.infer<typeof CredentialSchema>;
