/**
 * Global type declarations
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>
    fbq?: (...args: any[]) => void
    _fbq?: (...args: any[]) => void
    lintrk?: (method: string, params?: Record<string, any>) => void
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
  }
}

export {}

