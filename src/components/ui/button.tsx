import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lowercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "bg-transparent border border-accent-primary text-white shadow-xl shadow-accent-primary/30 transition-all duration-300 hover:bg-accent-primary/20 hover:border-accent-primary/80 hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 rounded-xl",
      },
      size: {
        default: "px-6 py-3 text-base rounded-xl",
        sm: "px-4 py-2 text-sm rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl", 
        icon: "h-10 w-10 rounded-xl",
        "mobile-compact": "max-sm:text-[15px] max-sm:px-6 max-sm:py-3.5 max-sm:rounded-xl max-sm:min-h-[44px] sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg rounded-xl",
        "mobile-secondary": "max-sm:text-[14px] max-sm:px-5 max-sm:py-3 max-sm:rounded-xl max-sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg rounded-xl",
        "project-card": "text-xs px-3 py-2 sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-sm rounded-xl",
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