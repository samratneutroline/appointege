import NewPasswordForm from "@/components/auth/new-password-form"
import LoadingSpinner from "@/components/loading-spinner"
import React, { Suspense } from "react"

export default function NewPassword() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewPasswordForm />
    </Suspense>
  )
}
