"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
   const validation = RegisterSchema.safeParse(values)

   if (!validation.success) {
    return { error: "Invalid Fields "}
   }

   const { email, password, name } = validation.data
   const hashPassword = await bcrypt.hash(password, 10)

   const existingUser = await getUserByEmail(email)

   if (existingUser) {
      return {error : "Email already in use"}
   }

   await db.user.create({
      data: {
         name,
         email,
         password: hashPassword
      }
   })

   return { success: "User created Successfully "}
}