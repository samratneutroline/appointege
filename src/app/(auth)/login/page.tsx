// src/app/(auth)/login/page.tsx
import { Suspense } from "react"
import LoginForm from "@/components/auth/login-form"
import LoadingSpinner from "@/components/loading-spinner"

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  )
}
