import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { FloatingLabelInput } from "./floating-input.js";

type PasswordInputWithToggleProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export const PasswordInputWithToggle = React.forwardRef<
  HTMLInputElement,
  PasswordInputWithToggleProps
>(({ className, label = "Password", ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <FloatingLabelInput
        ref={ref}
        id={props.id || "password"}
        type={showPassword ? "text" : "password"}
        label={label}
        className={cn("h-12 pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((s) => !s)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
});

PasswordInputWithToggle.displayName = "PasswordInputWithToggle";
