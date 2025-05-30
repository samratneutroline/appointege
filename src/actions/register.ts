"use server"

import bcrypt from "bcryptjs"
import { SignupSchema, SignupSchemaType } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateTokenForEmailVerification } from "@/lib/token"

export async function register(values: SignupSchemaType) {
  const validateFields = SignupSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid inputs!" }
  }

  const { email, password, name } = validateFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }
  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
  if (!newUser) {
    return { error: "User creation failed!" }
  }
  // Optionally, you can return the new user or some success message
  // return newUser
  if (newUser) {
    // Send Verification Email
    await generateTokenForEmailVerification(email)
    return { success: "Email confirmation sent!" }
  }

  return { error: "Register failed!" }
}
