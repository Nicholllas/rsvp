import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn("flex min-h-28 w-full resize-none rounded-xl border border-sage-700/15 bg-white/70 px-4 py-3 text-sm text-sage-900 outline-none transition placeholder:text-sage-700/45 focus:border-gold focus:ring-2 focus:ring-gold/15 disabled:opacity-50", className)}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
