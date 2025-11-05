import { z } from "zod"

export const leadSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().optional(),
  role: z.string().optional(),
  preferredTime: z.enum(["Manhã", "Tarde", "Noite"]).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos para continuar",
  }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

/**
 * Sanitiza o telefone removendo tudo exceto dígitos
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}

/**
 * Formata telefone para HubSpot (com +55)
 * Exemplo: 11987654321 -> +5511987654321
 */
export function formatPhoneForHubSpot(phone: string): string {
  const digits = sanitizePhone(phone)
  // Se já começar com 55, retorna com +
  if (digits.startsWith("55")) {
    return `+${digits}`
  }
  // Se não tiver código do país, adiciona +55
  return `+55${digits}`
}

/**
 * Formata telefone para WhatsApp (sem +55, só dígitos)
 * Exemplo: +5511987654321 -> 5511987654321
 */
export function formatPhoneForWhatsApp(phone: string): string {
  const digits = sanitizePhone(phone)
  // Se não começar com 55, adiciona
  if (!digits.startsWith("55")) {
    return `55${digits}`
  }
  return digits
}

