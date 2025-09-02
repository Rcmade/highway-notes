import SocialLoginButton from "@/components/button/SocialLoginButton";
import type { Children } from "@/types";
import { Link } from "react-router-dom";

interface AuthFormLayoutProps extends Children {
  title: string;
  subTitle?: string;
  navigateVariant: "login" | "signup";
}
const AuthFormLayout = ({
  children,
  title,
  navigateVariant,
  subTitle,
}: AuthFormLayoutProps) => {
  const variants: Record<
    AuthFormLayoutProps["navigateVariant"],
    { href: string; title: string; description: string }
  > = {
    signup: {
      href: "/auth/login",
      title: "Sign in",
      description: "Already have an account?",
    },
    login: {
      href: "/auth/signup",
      title: "Sign up",
      description: "Need an account?",
    },
  };
  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-balance text-foreground sm:text-4xl">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
        )}
      </div>

      {children}

      <SocialLoginButton />

      <p className="mt-4 text-center text-lg text-muted-foreground">
        {variants[navigateVariant].description}
        <Link
          to={variants[navigateVariant].href}
          className="ml-1 font-semibold text-secondary hover:underline"
        >
          {variants[navigateVariant].title}
        </Link>
      </p>
    </div>
  );
};

export default AuthFormLayout;
