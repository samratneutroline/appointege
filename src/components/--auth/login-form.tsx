import React from "react"
import AuthCardWrapper from "./auth-card-wrapper"

const LoginForm = () => {
  return (
    <AuthCardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      LoginForm
    </AuthCardWrapper>
  )
}

export default LoginForm
