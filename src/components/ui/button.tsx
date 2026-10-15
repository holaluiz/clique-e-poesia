import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(63,80,63,0.15)] hover:bg-primary-hover active:scale-[0.98]",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:opacity-90",
        outline:
          "border border-border bg-transparent text-text-primary hover:bg-surface active:scale-[0.98]",
        secondary:
          "bg-surface text-text-primary border border-border shadow-[0_2px_8px_rgba(32,32,27,0.04)] hover:bg-surface-alt active:scale-[0.98]",
        ghost: "text-text-primary hover:bg-surface/60",
        link: "text-primary underline-offset-4 hover:underline",
        navCta:
          "text-text-primary bg-surface hover:bg-surface-alt active:scale-[0.98] border border-border shadow-[0_2px_8px_rgba(32,32,27,0.04)] transition-all",
        hero:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.98] shadow-[0_4px_16px_rgba(63,80,63,0.18)] transition-all",
        heroOutline:
          "bg-background/90 text-text-primary border border-border hover:bg-surface active:scale-[0.98] shadow-[0_2px_8px_rgba(32,32,27,0.04)] transition-all",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-[4px] px-3.5 text-xs",
        lg: "h-11 rounded-[8px] px-7",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
