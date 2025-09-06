import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const borderVariants = cva(
  "border-[0.5px] border-solid border-[#A1A1A1]",
  {
    variants: {
      variant: {
        default: "border-[#A1A1A1]",
        light: "border-[#D1D1D1]",
        dark: "border-[#717171]",
        primary: "border-primary",
        secondary: "border-secondary",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      thickness: {
        thin: "border-[0.5px]",
        normal: "border",
        thick: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "none",
      thickness: "thin",
    },
  }
)

interface BorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof borderVariants> {
  asChild?: boolean
}

const Border = React.forwardRef<HTMLDivElement, BorderProps>(
  ({ className, variant, rounded, thickness, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      const child = React.Children.only(children as React.ReactElement<any>)
      return React.cloneElement(child, {
        ...props,
        className: cn(
          borderVariants({ variant, rounded, thickness }),
          child.props.className,
          className
        ),
        ref,
      })
    }

    return (
      <div
        ref={ref}
        className={cn(borderVariants({ variant, rounded, thickness, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Border.displayName = "Border"

export { Border, borderVariants }
