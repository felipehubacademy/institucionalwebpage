"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { submitToHubSpot } from "@/utils/hubspot-submit"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface HubSpotFormProps {
  portalId: string
  formId: string
  includeMessage?: boolean
  className?: string
}

export default function HubSpotForm({ portalId, formId, includeMessage = false, className = "" }: HubSpotFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      const result = await submitToHubSpot(formData, portalId, formId)

      setFormStatus({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        form.reset()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        success: false,
        message: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      {formStatus.success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Mensagem enviada com sucesso!</h3>
          <p className="text-green-700">{formStatus.message}</p>
          <Button
            onClick={() => setFormStatus({})}
            className="mt-4 bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full"
          >
            Enviar outro formulário
          </Button>
        </div>
      ) : (
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm font-medium leading-none">
                Nome
              </label>
              <input
                id="firstname"
                name="firstname"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Digite seu nome"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastname" className="text-sm font-medium leading-none">
                Sobrenome
              </label>
              <input
                id="lastname"
                name="lastname"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Digite seu sobrenome"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Digite seu email"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Digite seu telefone"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="interesse" className="text-sm font-medium leading-none">
              Interesse
            </label>
            <select
              id="interesse"
              name="interesse"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
              disabled={isSubmitting}
            >
              <option value="">Selecione uma opção</option>
              <option value="Programa Individual">Programa Individual</option>
              <option value="Programa Corporativo">Programa Corporativo</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {includeMessage && (
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium leading-none">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Digite sua mensagem"
                disabled={isSubmitting}
              ></textarea>
            </div>
          )}

          {formStatus.success === false && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{formStatus.message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
              </span>
            ) : (
              "Enviar Mensagem"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
