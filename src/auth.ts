import { createUser } from "@/lib/services/users.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

const signUpCredentialsSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "****",
        },
      },
      authorize: async (credentials) => {
        const parsed = signUpCredentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const res = await createUser({ ...parsed.data, icon: "" });
        return res ?? null;
      },
    }),
  ],
});
