import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold tracking-wide uppercase no-underline transition-[transform,background-color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-signal-ink shadow-[0_0_0_1px_rgb(0_0_0_/_0.12)] hover:bg-signal/90",
        zap: "bg-zap text-zap-ink hover:bg-zap/90",
        outline:
          "bg-transparent text-fog shadow-[0_0_0_1px_rgb(245_245_240_/_0.18)] hover:bg-fog/5",
      },
      size: {
        md: "h-12 min-h-12 rounded-md px-5 text-sm",
        lg: "h-14 min-h-14 rounded-md px-6 text-base",
        xl: "h-16 min-h-16 rounded-lg px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
