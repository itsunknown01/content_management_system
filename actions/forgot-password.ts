"use server"

import * as z from "zod"

import { PasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendResetPasswordEmail } from "@/lib/mail"

export const forgotPassword = async (values: z.infer<typeof PasswordSchema>) => {
  const validation = PasswordSchema.safeParse(values)

  if (!validation.success) {
    return { error : "Invalid email"}
  }

  const {email} = validation.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Email not found "}
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
  
  return {success : "Reset Email sent! "}
}