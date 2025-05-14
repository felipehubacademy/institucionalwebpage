import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "none"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const positionClasses = {
  "top-left": "fixed top-4 left-4 z-50",
  "top-right": "fixed top-4 right-4 z-50",
  "bottom-left": "fixed bottom-4 left-4 z-50",
  "bottom-right": "fixed bottom-4 right-4 z-50",
  none: "",
}

export function IconButton({ icon, position = "none", variant = "ghost", className, ...props }: IconButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn("icon-button rounded-full", positionClasses[position], className)}
      {...props}
    >
      {icon}
    </Button>
  )
}
