"use client"
import React from "react"
import { Button } from "../ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGGEDIN_USER_REDIRECT } from "@/routes"

const SocialButtons = () => {
  const onClick = (provider: string) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGEDIN_USER_REDIRECT,
    })
  }

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        className=""
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FaGoogle />
      </Button>
      {/* <Button
        className=""
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button> */}
    </div>
  )
}

export default SocialButtons
