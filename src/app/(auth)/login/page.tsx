"use client"
import LoginForm from "@/components/auth/login-form"
import LoadingSpinner from "@/components/loading-spinner"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  )
}
