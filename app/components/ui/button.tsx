import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        langchain:
          "bg-langchain-green-button text-white hover:bg-langchain-green-button/90 transition-colors dark:bg-langchain-purple dark:hover:bg-langchain-purple/90 dark:text-langchain-green-button",
        "langchain-secondary":
          "border-2 border-langchain-purple text-langchain-purple hover:bg-langchain-purple hover:text-white transition-colors dark:border-langchain-green dark:text-langchain-green dark:hover:bg-langchain-green dark:hover:text-white",
        "purple-glow":
          "bg-[#1D3D3C] hover:bg-[#1D3D3C]/90 text-white shadow-lg shadow-purple-300/30 hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300 dark:bg-[#BFB4FD] dark:hover:bg-[#BFB4FD]/90 dark:text-[#1D3D3C] dark:shadow-purple-500/30 dark:hover:shadow-purple-500/40",
        "outline-light":
          "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 dark:border-white/20 dark:text-white dark:hover:bg-white/10",
        "ghost-light":
          "text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
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
