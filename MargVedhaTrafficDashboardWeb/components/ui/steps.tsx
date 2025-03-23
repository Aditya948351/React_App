"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Steps = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: number
  }
>(({ className, active = 0, ...props }, ref) => {
  const children = React.Children.toArray(props.children)

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            active: index === active,
            completed: index < active,
            step: index + 1,
          })
        }
        return child
      })}
    </div>
  )
})
Steps.displayName = "Steps"

const Step = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    completed?: boolean
    step?: number
  }
>(({ className, active, completed, step, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-8 pb-8 last:pb-0",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-muted",
        "last:before:hidden",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border text-xs font-bold",
          active
            ? "border-primary bg-primary text-primary-foreground"
            : completed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground bg-background text-muted-foreground",
        )}
      >
        {completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          step
        )}
      </div>
      <div
        className={cn(
          "cursor-pointer rounded-md border p-3 transition-colors",
          active ? "border-primary bg-primary/5" : "border-muted bg-background hover:bg-muted/50",
        )}
      >
        {props.children}
      </div>
    </div>
  )
})
Step.displayName = "Step"

export { Steps, Step }

