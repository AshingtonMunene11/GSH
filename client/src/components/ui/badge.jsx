import React from "react";
import { cn } from "@/lib/utils"; // adjust path if your utils file is elsewhere

const badgeVariants = {
  default:
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90",
  destructive:
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors bg-destructive text-white hover:bg-destructive/90",
  outline:
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors text-foreground hover:bg-accent hover:text-accent-foreground",
};

export function Badge({ className, variant = "default", children, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
