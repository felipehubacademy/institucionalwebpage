/**
 * Image Preloader Script
 * This script preloads and verifies all critical images on the site
 */

// List of critical images to preload
const criticalImages = [
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
]

// Function to preload images
function preloadImages() {
  console.log("Preloading critical images...")

  const preloadPromises = criticalImages.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        console.log(`✅ Successfully preloaded: ${src}`)
        resolve(src)
      }

      img.onerror = () => {
        console.error(`❌ Failed to preload: ${src}`)
        reject(src)
      }

      img.src = src
    })
  })

  Promise.allSettled(preloadPromises).then((results) => {
    const successful = results.filter((result) => result.status === "fulfilled").length
    const failed = results.filter((result) => result.status === "rejected").length

    console.log(`Preloading complete: ${successful} successful, ${failed} failed`)

    if (failed > 0) {
      console.warn("Some images failed to load. Using fallbacks where needed.")
    }
  })
}

// Run preloader when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", preloadImages)
} else {
  preloadImages()
}
