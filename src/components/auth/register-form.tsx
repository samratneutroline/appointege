"use client";

import React, { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema, LoginSchemaType, SignupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { register } from "@/actions/register";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Social } from "./social";
// import { login } from "@/actions/login"
// import { register } from "@/actions/register"

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      password1: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setSuccess("");
    setError("");
    startTransition(async () => {
      const { success, error } = await register(values);
      if (success) {
        setSuccess(success);
        form.reset();
      }
      if (error) setError(error);
      // register(values)
      //   .then(({ success, error }) => {
      //     if (success) setSuccess(success)
      //     if (error) setError(error)
      //   })
      //   .catch((error) => setError("Couldn't get action!"))
    });
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreeToTerms(checked === true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-h-170 overflow-y-auto scrollbar-thin">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 leading-8">
          Create Account
        </h2>
        <p className="text-[#485669] text-sm font-medium  ">
          Join Appointege and start managing appointments
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="text-black font-medium text-sm leading-5">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    {" "}
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Full name"
                      disabled={isPending}
                      className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm font-medium  "
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="text-black font-medium text-sm leading-5">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />

                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm font-medium "
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="text-black font-medium text-sm leading-5">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      {...field}
                      disabled={isPending}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm font-medium"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="text-black font-medium text-sm leading-5">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      disabled={isPending}
                      className="pl-9 pr-10 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password1"
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="text-black font-medium text-sm leading-5">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />

                    <Input
                      {...field}
                      type={showPassword1 ? "text" : "password"}
                      placeholder="Confirm password"
                      disabled={isPending}
                      className="pl-9 pr-10 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword1 ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex w-full items-start">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={handleTermsChange}
              className="mt-0.5 h-4 w-4 flex-shrink-0 border-slate-300 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
            />
            <Label
              htmlFor="terms"
              className="ml-2 flex-wrap text-sm text-slate-600"
            >
              <span className="whitespace-nowrap">
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isPending || !agreeToTerms}
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 text-sm"
          >
            {isPending
              ? "Creating Account..."
              : "Create Account & Start Managing"}
          </Button>
        </form>
      </Form>

      <Social />

      <div className="mt-6 text-center">
        <p className="text-black text-sm font-normal">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-sm text-sky-600 hover:text-sky-700 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>

    // <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
    //   <div className="text-center mb-6">
    //     <h2 className="text-2xl font-bold text-slate-800 mb-1">
    //       Create Account
    //     </h2>
    //     <p className="text-slate-600 text-sm">
    //       Join Appointege and start managing appointments
    //     </p>
    //   </div>

    //   <form
    //     onSubmit={form.handleSubmit(onSubmit)}
    //     className="space-y-4"
    //     noValidate
    //   >
    //     <div className="grid grid-cols-2 gap-3">
    //       <div className="space-y-2">
    //         <Label
    //           htmlFor="firstName"
    //           className="text-slate-700 font-medium text-sm"
    //         >
    //           First Name
    //         </Label>
    //         <div className="relative">
    // <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //           <Input
    //             id="firstName"
    //             type="text"
    //             {...form.register("firstName")}
    // className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    //             placeholder="First name"
    //             required
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-2">
    //         <Label
    //           htmlFor="lastName"
    //           className="text-slate-700 font-medium text-sm"
    //         >
    //           Last Name
    //         </Label>
    //         <div className="relative">
    //           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //           <Input
    //             id="lastName"
    //             type="text"
    //             {...form.register("lastName")}
    //             className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    //             placeholder="Last name"
    //             required
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="space-y-2">
    //       <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
    //         Email Address
    //       </Label>
    //       <div className="relative">
    // <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //         <Input
    //           id="email"
    //           type="email"
    //           {...form.register("email")}
    // className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    // placeholder="Enter your email"
    //           required
    //         />
    //       </div>
    //     </div>

    //     <div className="space-y-2">
    //       <Label
    //         htmlFor="phoneNumber"
    //         className="text-slate-700 font-medium text-sm"
    //       >
    //         Phone Number
    //       </Label>
    //       <div className="relative">
    //         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //         <Input
    //           id="phoneNumber"
    //           type="tel"
    //           {...form.register("phoneNumber")}
    //           className="pl-9 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    //           placeholder="Enter your phone number"
    //           required
    //         />
    //       </div>
    //     </div>

    //     <div className="space-y-2">
    //       <Label
    //         htmlFor="password"
    //         className="text-slate-700 font-medium text-sm"
    //       >
    //         Password
    //       </Label>
    //       <div className="relative">
    //         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //         <Input
    //           id="password"
    // type={showPassword ? "text" : "password"}
    //           {...form.register("password")}
    // className="pl-9 pr-10 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    //           placeholder="Create password"
    //           required
    //         />
    //         <button
    //           type="button"
    //           onClick={() => setShowPassword(!showPassword)}
    //           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
    //         >
    //           {showPassword ? (
    //             <EyeOff className="w-4 h-4" />
    //           ) : (
    //             <Eye className="w-4 h-4" />
    //           )}
    //         </button>
    //       </div>
    //     </div>

    //     <div className="space-y-2">
    //       <Label
    //         htmlFor="confirmPassword"
    //         className="text-slate-700 font-medium text-sm"
    //       >
    //         Confirm Password
    //       </Label>
    //       <div className="relative">
    // <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
    //         <Input
    //           id="confirmPassword"
    //           type={showConfirmPassword ? "text" : "password"}
    //           {...form.register("confirmPassword")}
    //           className="pl-9 pr-10 h-11 border-slate-300 focus:border-sky-500 focus:ring-sky-500 rounded-xl text-sm"
    //           placeholder="Confirm password"
    //           required
    //         />
    //         <button
    //           type="button"
    //           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    //           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
    //         >
    //           {showConfirmPassword ? (
    //             <EyeOff className="w-4 h-4" />
    //           ) : (
    //             <Eye className="w-4 h-4" />
    //           )}
    //         </button>
    //       </div>
    //     </div>

    //   <div className="flex items-start space-x-2">
    //     <Checkbox
    //       id="terms"
    //       checked={agreeToTerms}
    //       onCheckedChange={handleTermsChange}
    //       className="border-slate-300 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 mt-1"
    //     />
    //     <Label
    //       htmlFor="terms"
    //       className="text-sm text-slate-600 leading-relaxed"
    //     >
    //       I agree to the{" "}
    //       <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
    //         Terms of Service
    //       </a>{" "}
    //       and{" "}
    //       <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
    //         Privacy Policy
    //       </a>
    //     </Label>{" "}
    //   </div>

    //   <Button
    //     type="submit"
    //     disabled={isLoading || !agreeToTerms}
    //     className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 text-sm"
    //   >
    //     {isLoading
    //       ? "Creating Account..."
    //       : "Create Account & Start Managing"}
    //   </Button>
    // </form>

    // <div className="my-4">
    //   <div className="relative">
    //     <div className="absolute inset-0 flex items-center">
    //       <div className="w-full border-t border-slate-300" />
    //     </div>
    //     <div className="relative flex justify-center text-sm">
    //       <span className="px-4 bg-white text-slate-500">
    //         Or continue with
    //       </span>
    //     </div>
    //   </div>
    // </div>

    // <Button
    //   type="button"
    //   variant="outline"
    //   onClick={() => handleSocialSignup("Google")}
    //   className="w-full h-11 border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-[1.02] text-sm"
    // >
    //   <FcGoogle />
    //   Sign up with Google
    // </Button>

    // <div className="mt-6 text-center">
    //   <p className="text-slate-600 text-sm">
    //     Already have an account?{" "}
    //     <button
    //       type="button"
    //       onClick={onSwitchToLogin}
    //       className="text-sky-600 hover:text-sky-700 font-semibold transition-colors"
    //     >
    //       Sign in
    //     </button>
    //   </p>
    // </div>
    // </div>
  );
}
