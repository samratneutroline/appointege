"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGGEDIN_USER_REDIRECT } from "@/routes"
import { LoginSchema, LoginSchemaType } from "@/schemas"
import { AuthError } from "next-auth"

export async function login(values: LoginSchemaType) {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Email and password are required!" }
  }

  const { email, password } = validateFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGGEDIN_USER_REDIRECT,
    })
  } catch (error) {
    console.log("Error while login using credentails", error)
    if (error instanceof AuthError) {
      switch (error.type) {
        // error coming from Credential() provider: authorize() function
        case "CredentialsSignin":
          return { error: "Invalid Credentails" }
        default:
          return { error: "Something went wrong in signIn!" }
      }
    }
    // if not thrown it will not redirect, just for next.js and next-auth to handle the redirect by itself, just logs it and works fine
    throw error
  }
  return { success: "Login Success!" }
}
