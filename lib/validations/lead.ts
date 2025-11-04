import { z } from "zod"

export const leadSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().optional(),
  role: z.string().optional(),
  level: z.enum([
    "A1 (iniciante)",
    "A2 (básico)",
    "B1 (consigo, mas travo)",
    "B2 (me viro, falta fluidez)",
    "C1 (avançado)",
  ]),
  preferredTime: z.string().optional(),
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

