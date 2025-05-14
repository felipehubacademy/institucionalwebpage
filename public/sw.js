// Service Worker for Hub Academy
const CACHE_NAME = "hub-academy-cache-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/site.webmanifest",
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
]

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      // Clone the request because it's a one-time use stream
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response because it's a one-time use stream
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          // Don't cache API requests or external resources
          if (event.request.url.includes("/api/") || !event.request.url.startsWith(self.location.origin)) {
            return
          }
          cache.put(event.request, responseToCache)
        })

        return response
      })
    }),
  )
})

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/android-chrome-192x192.png",
    badge: "/favicon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})
