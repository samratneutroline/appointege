import React from "react"
import { Button } from "../ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const SocialButtons = () => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        className=""
        variant={"outline"}
        // onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        className=""
        variant={"outline"}
        // onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  )
}

export default SocialButtons
