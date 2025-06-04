"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema, ResetSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { resetPassword } from "@/actions/reset";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await resetPassword(values);

      // Fallback in case `result` is undefined or invalid
      if (!result) {
        setError("Unexpected error, please try again!");
        return;
      }

      const { error, success } = result; // Safely destructure
      console.log(error, success);

      if (error) {
        setError(error);
      }
      if (success) {
        setSuccess(success);
      }
      // console.error("Error while login form:", err)
      // setError("Something went wrong, please try again, or reload! 😉")
    });
  };

  return (
    // <CardWrapper
    //   headerLabel={"Forgot your password?"}
    //   backButtonLabel={"Back to login"}
    //   backButtonHref={"/auth/login"}
    // >
    //   <Form {...form}>
    //     <form
    //       onSubmit={form.handleSubmit(onSubmit)}
    //       className="space-y-4 flex flex-col"
    //     >
    //       <FormField
    //         control={form.control}
    //         name="email"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>Email</FormLabel>
    //             <FormControl>
    //               {/* Spread ...field for controlled input */}
    //               <Input
    //                 disabled={isPending}
    //                 {...field}
    //                 placeholder="nischal.dev@example.com"
    //                 //   disabled={isPending}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <FormError message={error} />
    //       <FormSuccess message={success} />
    //       <Button disabled={isPending} type="submit">
    //         Rest Password
    //       </Button>
    //     </form>
    //   </Form>
    // </CardWrapper>

    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 transition-all duration-300 hover:shadow-3xl">
      <CardHeader className="text-center pb-2 ">
        <CardTitle className="text-2xl font-[800] text-gray-800">
          Reset Password
        </CardTitle>
        <p className="text-gray-600 leading-relaxed text-sm font-medium">
          Enter the email associated with your account, and we'll send you a
          password reset link.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-slate-700 font-medium text-sm">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-lg text-sm font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 text-sm"
            >
              Rest Password
            </Button>

            {/* Back to Login Link */}
            <Link
              href="/login"
              className="w-full flex items-center justify-center text-sm text-sky-600 hover:text-sky-700  py-2 transition-all duration-200 hover:underline transform hover:scale-[1.02] font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
