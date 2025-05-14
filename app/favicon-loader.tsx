"use client"

import { useEffect } from "react"

export function FaviconLoader() {
  useEffect(() => {
    // This function ensures favicons are properly loaded and cached
    const preloadFavicons = () => {
      const favicons = [
        "/favicon.ico",
        "/favicon.svg",
        "/favicon-96x96.png",
        "/apple-touch-icon.png",
        "/android-chrome-192x192.png",
        "/android-chrome-512x512.png",
      ]

      favicons.forEach((favicon) => {
        const link = document.createElement("link")
        link.rel = favicon.endsWith(".svg") ? "icon" : "preload"
        link.href = favicon
        link.as = "image"
        document.head.appendChild(link)
      })
    }

    preloadFavicons()
  }, [])

  return null
}
