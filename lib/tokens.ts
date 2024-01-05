import { v4 as uuid } from "uuid"

import { getVerificaitonTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset";

export const generateVerificationToken = async (email: string) => {
   const token = uuid();
   const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

   const existingToken = await getVerificaitonTokenByEmail(email)

   if (existingToken) {
    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })
   }

   const verificationToken = await db.verificationToken.create({
    data: {
        email,
        token,
        expires
    }
   })

   return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
   const token = uuid();
   const expires = new Date(new Date().getTime() + 3600 * 1000)

   const existingToken = await getPasswordResetTokenByEmail(email)

   if (existingToken) {
    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })
   }

   const verificationToken = await db.passwordResetToken.create({
    data: {
        email,
        token,
        expires
    }
   })

   return verificationToken
}