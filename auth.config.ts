import  bcrypt  from 'bcryptjs';
import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import Google from 'next-auth/providers/google';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Credentials({
    async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials)

        if (validation.success) {
            const {email, password} = validation.data;

            const user = await getUserByEmail(email)
            if (!user || !user.password) return null

            const passwordMatcher = await bcrypt.compare(password, user.password)

            if (passwordMatcher) return user
        }

        return null
    }
  })]
} satisfies NextAuthConfig