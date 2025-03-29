// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import Credentials from "next-auth/providers/credentials"
// import clientPromise from "@/lib/database"
// import { CredentialSchema } from "@/lib/models/user.model"
// import { getUserByCredentials } from "@/lib/users.service"
// import { ZodError } from "zod"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     Google,
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password : {},
//       },
//       authorize: async (credentials) => {
//       try {

//         let user = null

//         const { email, password } = await CredentialSchema.parseAsync(credentials)
//         const data = { email, password }
//         user = await getUserByCredentials(data)

//         if (!user) {
//           throw new Error("User not found.")
//         }

//         return user
//       } catch (error) {
//           if (error instanceof ZodError) {
//             return null
//           }
//         }
//       },
//     })
//   ],
//   callbacks: {
//     async jwt({ user, token }) {
//       if (user) {
//             token.user = user;
//       }
//       return token;
//     },
//     async session({session, token}: any) {
//       session.user = token.user;
//       return session;
//     },
//   }
// })

