import { createUser } from "@/lib/services/users.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"

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
        const user = {
          username: credentials.username as unknown as string,
          email: credentials.email as unknown as string,
          password: credentials.password as unknown as string,
          icon: "",
        };
        const res = await createUser(user);

        return res;
      },
    }),
  ],
});
