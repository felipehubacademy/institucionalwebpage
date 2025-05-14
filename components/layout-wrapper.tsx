"use client"

import { type ReactNode, useEffect, useState } from "react"

interface LayoutWrapperProps {
  children: ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [headerHeight, setHeaderHeight] = useState(64) // Default height (16 * 4 = 64px)

  useEffect(() => {
    // Measure the actual header height after component mounts
    const header = document.querySelector("header")
    if (header) {
      const height = header.offsetHeight
      setHeaderHeight(height)
    }

    // Update header height on resize
    const handleResize = () => {
      const header = document.querySelector("header")
      if (header) {
        const height = header.offsetHeight
        setHeaderHeight(height)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div style={{ paddingTop: `${headerHeight}px` }} className="min-h-screen flex flex-col">
      {children}
    </div>
  )
}
