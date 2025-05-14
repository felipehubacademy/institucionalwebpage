/**
 * Utility to optimize SVG files for better rendering
 * This is a client-side utility that can be used to improve SVG rendering quality
 */

interface SVGOptimizationOptions {
  removeViewBox?: boolean
  removeDimensions?: boolean
  addViewBox?: boolean
  cleanupIDs?: boolean
  removeHiddenElements?: boolean
}

/**
 * Optimizes an SVG string for better rendering
 * @param svgString The SVG content as a string
 * @param options Optimization options
 * @returns Optimized SVG string
 */
export function optimizeSVG(svgString: string, options: SVGOptimizationOptions = {}): string {
  // Default options
  const opts = {
    removeViewBox: false,
    removeDimensions: true,
    addViewBox: true,
    cleanupIDs: true,
    removeHiddenElements: true,
    ...options,
  }

  // Simple SVG optimization (for more complex optimization, use SVGO library)
  let optimized = svgString

  // Remove XML declaration
  optimized = optimized.replace(/<\?xml.*?\?>/, "")

  // Remove comments
  optimized = optimized.replace(/<!--.*?-->/g, "")

  // Remove dimensions if requested and add viewBox if missing
  if (opts.removeDimensions) {
    const viewBoxMatch = optimized.match(/viewBox=["']([^"']*)["']/)
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : null

    if (viewBox && opts.removeDimensions) {
      // Remove width and height attributes
      optimized = optimized.replace(/\s+width=["'][^"']*["']/g, "")
      optimized = optimized.replace(/\s+height=["'][^"']*["']/g, "")
    }
  }

  // Add viewBox if missing and we have width/height
  if (opts.addViewBox && !optimized.includes("viewBox")) {
    const widthMatch = optimized.match(/width=["']([^"']*)["']/)
    const heightMatch = optimized.match(/height=["']([^"']*)["']/)

    if (widthMatch && heightMatch) {
      const width = Number.parseFloat(widthMatch[1])
      const height = Number.parseFloat(heightMatch[1])

      if (!isNaN(width) && !isNaN(height)) {
        optimized = optimized.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`)
      }
    }
  }

  // Remove hidden elements
  if (opts.removeHiddenElements) {
    optimized = optimized.replace(/<[^>]+display:\s*none[^>]*>.*?<\/[^>]+>/g, "")
  }

  // Clean up whitespace
  optimized = optimized.replace(/>\s+</g, "><")
  optimized = optimized.replace(/\s{2,}/g, " ")

  return optimized
}

/**
 * Loads an SVG file and optimizes it
 * @param url URL of the SVG file
 * @param options Optimization options
 * @returns Promise that resolves to the optimized SVG string
 */
export async function loadAndOptimizeSVG(url: string, options?: SVGOptimizationOptions): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.statusText}`)
    }

    const svgString = await response.text()
    return optimizeSVG(svgString, options)
  } catch (error) {
    console.error("Error loading or optimizing SVG:", error)
    throw error
  }
}

/**
 * Creates an optimized data URL from an SVG string
 * @param svgString The SVG content as a string
 * @returns Data URL for the optimized SVG
 */
export function createSVGDataURL(svgString: string): string {
  const optimized = optimizeSVG(svgString)
  const encoded = encodeURIComponent(optimized)
  return `data:image/svg+xml,${encoded}`
}
