// generate verification token
import { getVerificationTokenByEmail } from "@/data/verificationToken"
import { db } from "@/lib/db"
// src/lib/token.ts
import crypto from "crypto"

export const generateTokenForEmailVerification = async (email: string) => {
  try {
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
      // Optionally delete or return existing token
      await db.verificationToken.delete({ where: { id: existingToken.id } })
    }
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hours
    const generatedToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    })
    return generatedToken
  } catch (error) {
    console.log("Error generating token for email verification:", error)
    return null
  }
}
