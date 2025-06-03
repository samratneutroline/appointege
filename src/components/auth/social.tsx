"use client"

import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGGEDIN_USER_REDIRECT } from "@/routes"

export function Social() {
  // const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get("callbackUrl")
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGGEDIN_USER_REDIRECT,
    })
  }
  return (
    <>
      {/* Line */}
      <div className="my-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => onClick("google")}
        className="cursor-pointer w-full h-11 border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-[1.02] text-sm"
      >
        <FcGoogle />
        Sign up with Google
      </Button>
    </>
  )
}
