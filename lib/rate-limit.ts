/**
 * Rate limiting implementation
 * 10 requests per 15 minutes per IP
 * 
 * TODO: Se preferir usar Upstash Redis em produção:
 * 1. Instalar: npm install @upstash/ratelimit @upstash/redis
 * 2. Substituir esta implementação pela do Upstash
 * 3. Adicionar variáveis UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Limpar entradas expiradas a cada 5 minutos
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function rateLimit(identifier: string): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: number
}> {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const limit = 10

  const entry = rateLimitMap.get(identifier)

  if (!entry || entry.resetTime < now) {
    // Nova janela de tempo
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    }
  }

  if (entry.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    }
  }

  entry.count++
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetTime,
  }
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(headers: Headers): string {
  // Verifica headers de proxy/load balancer
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  const realIP = headers.get("x-real-ip")
  if (realIP) {
    return realIP
  }

  // Fallback para desenvolvimento local
  return "localhost"
}

