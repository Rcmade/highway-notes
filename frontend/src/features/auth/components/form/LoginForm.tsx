"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingLabelInput } from "@/components/ui/floating-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInputWithToggle } from "@/components/ui/password-input";

import useLoginForm from "../hooks/useLoginForm";
import AuthFormLayout from "../layout/AuthFormLayout";

export function LoginForm() {
  const { form, isLoading, onSubmit, isOtpSent } = useLoginForm();

  return (
    <AuthFormLayout
      title="Sign in"
      subTitle="Please login to continue to your account."
      navigateVariant="login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button className="pl-0 text-secondary" variant={"link"}>
            Resend OTP
          </Button>

          {isOtpSent && (
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="mb-6 flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Keep me logged in</FormLabel>
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
            Sign In
          </Button>
        </form>
      </Form>
    </AuthFormLayout>
  );
}
