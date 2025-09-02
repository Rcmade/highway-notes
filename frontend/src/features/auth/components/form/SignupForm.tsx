"use client";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInputWithToggle } from "@/components/ui/password-input";
import { CalendarIcon } from "lucide-react";
import useSignUpForm from "../hooks/useSignUpForm";
import AuthFormLayout from "../layout/AuthFormLayout";

export function SignUpForm() {
  const { form, isLoading, onSubmit, isOtpSent } = useSignUpForm();

  return (
    <AuthFormLayout
      title="Sign up"
      subTitle="Sign up to enjoy the feature of HD"
      navigateVariant="signup"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    placeholder="Your Name"
                    {...field}
                    className="h-12"
                    id="name"
                    label="Your Name"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <CalendarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <FloatingLabelInput
                      type="date"
                      {...field}
                      className="h-12 pl-9"
                      id="dob"
                      label="Date of Birth"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    placeholder="Email"
                    {...field}
                    className="h-12"
                    id="email"
                    label="Email"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isOtpSent && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInputWithToggle
                      {...field}
                      id="otp"
                      label="OTP"
                      placeholder="OTP"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            className="h-12 w-full"
            spinner
            disabled={isLoading}
          >
            Sign up
          </Button>
        </form>
      </Form>
    </AuthFormLayout>
  );
}
