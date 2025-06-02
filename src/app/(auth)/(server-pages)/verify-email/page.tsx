import VerifyEmail from "@/components/auth/email-verify"
import LoadingSpinner from "@/components/loading-spinner"
import React, { Suspense } from "react"

export default function NewPassword() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmail />
    </Suspense>
  )
}
