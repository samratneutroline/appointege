// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT Callback - User:", user)
      // console.log("JWT Callback - Token:", token)
      if (user) {
        token.sub = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role // Add role to token
      }
      return token
    },
    async session({ session, token }) {
      // console.log("Session Callback Triggered - Session:", session)
      // console.log("Session Callback Triggered - Token:", token)
      if (token?.sub && session.user) {
        session.user.id = token.sub
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role // Add role to session
      }
      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
