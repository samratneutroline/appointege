import { auth, signOut } from "@/auth";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout() {
  const session = await auth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Appointege</h1>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 leading-8 mb-2">
            Welcome to Appointege
          </h2>
          <p className="text-[#485669] text-sm font-medium">
            {session?.user
              ? "Manage your appointments with ease"
              : "Sign in to continue"}
          </p>
        </div>

        <div className="space-y-4">
          {!session?.user ? (
            <div className="space-y-4">
              <LoginButton asChild>
                <Button
                  className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg mb-4"
                  size="lg"
                >
                  Sign In
                </Button>
              </LoginButton>
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-sky-600 hover:text-sky-700 font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Logged in as</p>
                <p className="font-medium text-slate-800">
                  {session.user.email}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  variant="outline"
                  className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-50"
                  size="lg"
                  type="submit"
                >
                  Sign Out
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
