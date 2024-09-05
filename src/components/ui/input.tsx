import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from 'class-variance-authority'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

  const inputVariants = cva(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
      variants: {
        variant: {
          default: "border-input bg-background",
        },
        inputSize: {
          sm: "h-10",
          md: "h-16 text-md rounded-3xl px-4"
        },
      },
      defaultVariants: {
        variant: "default",
        inputSize: "md",
      }
    },
  )

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({variant, inputSize}),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
