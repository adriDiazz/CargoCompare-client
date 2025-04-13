import * as React from "react";
import { cn } from "../../../lib/utils";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type = "text", icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border pl-4 border-input bg-background py-2 pr-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon && "pl-10", // espacio extra si hay ícono
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
