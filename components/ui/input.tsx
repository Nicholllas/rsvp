import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn("flex h-11 w-full rounded-xl border border-sage-700/15 bg-white/70 px-4 py-2 text-sm text-sage-900 outline-none transition placeholder:text-sage-700/45 focus:border-gold focus:ring-2 focus:ring-gold/15 disabled:opacity-50", className)}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
