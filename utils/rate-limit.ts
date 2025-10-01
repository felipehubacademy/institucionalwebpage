/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a more robust solution
 */

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

// Clean up old entries every 10 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  },
  10 * 60 * 1000,
)

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 5, windowMs: 60000 },
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    // Create new record
    const resetTime = now + options.windowMs
    rateLimitMap.set(identifier, { count: 1, resetTime })
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime,
    }
  }

  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Increment count
  record.count++
  rateLimitMap.set(identifier, record)

  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetTime: record.resetTime,
  }
}


