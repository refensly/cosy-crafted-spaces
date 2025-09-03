import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lowercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-2xl",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-2xl",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-2xl",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-2xl",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 rounded-2xl border-0",
      },
      size: {
        default: "px-8 py-4 text-base rounded-2xl",
        sm: "px-6 py-3 text-sm rounded-2xl",
        lg: "px-12 py-5 text-lg rounded-2xl", 
        icon: "h-12 w-12 rounded-2xl",
        "mobile-compact": "max-sm:text-[15px] max-sm:px-8 max-sm:py-4 max-sm:rounded-2xl max-sm:min-h-[50px] sm:px-10 sm:py-5 sm:text-base md:px-12 md:py-6 md:text-lg rounded-2xl",
        "mobile-secondary": "max-sm:text-[14px] max-sm:px-7 max-sm:py-4 max-sm:rounded-2xl max-sm:min-h-[48px] sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg rounded-2xl",
        "project-card": "text-xs px-5 py-3 sm:px-6 sm:py-3 sm:text-sm md:px-7 md:py-4 md:text-sm rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }