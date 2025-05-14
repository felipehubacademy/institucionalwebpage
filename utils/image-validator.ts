/**
 * Utility to validate image paths and log errors
 */

// List of all expected image paths
const expectedImages = [
  "/images/Logo_horizontal_green.svg",
  "/images/logos/Logo_Avalara.svg",
  "/images/logos/Logo_JBS.svg",
  "/images/logos/Logo_Renaissance.svg",
  "/images/logos/Logo_Boehringer.svg",
  "/images/logos/Logo_Collinson.svg",
  "/images/logos/Logo_Honeywell.svg",
  "/images/logos/Logo_IDEMIA.svg",
  "/images/logos/Logo_Eureciclo.svg",
  "/images/logos/Logo_Libbs.svg",
  "/images/logos/Logo_Amazon.svg",
  "/images/MeetUP02.png",
  "/images/Rodolfo_Felipe_meetup.png",
  "/images/avatars/Avatar_Bianca.svg",
  "/images/avatars/Avatar_Daniela.svg",
  "/images/avatars/Avatar_Samuel.svg",
  "/images/avatars/Avatar_Elivelton.svg",
  "/images/Lale_avatar.svg",
  "/images/hub-academy-og.png",
]

// Function to validate image paths
export function validateImagePaths() {
  if (typeof window === "undefined") return

  console.log("Validating image paths...")

  expectedImages.forEach((path) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${path}`)
    }
    img.onerror = () => {
      console.error(`❌ Failed to load image: ${path}`)
    }
  })
}

// Function to get a fallback image path
export function getFallbackImagePath(originalPath: string): string {
  // Extract file extension
  const extension = originalPath.split(".").pop()?.toLowerCase()

  // Return appropriate fallback based on file type
  if (extension === "svg") {
    return "/placeholder.svg"
  } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
    return "/placeholder.svg"
  }

  return "/placeholder.svg"
}

// Function to check if an image exists
export async function checkImageExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking image ${path}:`, error)
    return false
  }
}
