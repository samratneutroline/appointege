"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  onLogin?: () => void
  mode?: "modal" | "redirect"
  asChild?: boolean
  children?: React.ReactNode
}

export const LoginButton = ({
  onLogin,
  mode = "redirect",
  asChild = false,
  children,
}: LoginButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push("/login")
  }

  if (mode === "modal") {
    return <span></span>
  }
  return <span onClick={onClick}> {children}</span>
}
