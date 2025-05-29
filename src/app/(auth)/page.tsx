import { auth, signOut } from "@/auth"
import { LoginButton } from "@/components/--auth/login-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const font = Poppins({ subsets: ["latin"], weight: ["600"] })

export default async function AuthLayout() {
  const session = await auth()

  return (
    <main className="">
      {JSON.stringify(session, null, 2)}
      <div className=" text-center">
        <h1
          className={cn(
            "text-5xl font-semibold drop-shadow-md ",
            font.className
          )}
        >
          🔐
          <span className=" bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
            APPOINTEGE
          </span>
        </h1>
        <p className="text-slate-500 text-lg">
          A simple authentication service
        </p>
        <div>
          <LoginButton mode="" asChild>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
          className="mt-4"
        >
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            Sign out
          </Button>
        </form>
      </div>
    </main>
  )
}
