"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { submitToHubSpot } from "@/utils/hubspot-submit"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import CustomPhoneInput from "./phone-input"

interface HubSpotFormProps {
  portalId: string
  formId: string
  includeMessage?: boolean
  messageRequired?: boolean
  className?: string
}

export default function HubSpotForm({
  portalId,
  formId,
  includeMessage = false,
  messageRequired = false,
  className = "",
}: HubSpotFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateForm = (form: HTMLFormElement) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    // Check required fields
    const requiredFields = ["firstname", "lastname", "email", "interesse"]
    if (includeMessage && messageRequired) {
      requiredFields.push("message")
    }

    requiredFields.forEach((field) => {
      const element = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (!element?.value) {
        newErrors[field] = "Este campo é obrigatório"
        isValid = false
      }
    })

    // Check phone
    if (!phoneNumber) {
      newErrors["phone"] = "Telefone é obrigatório"
      isValid = false
    } else if (!isPhoneValid) {
      newErrors["phone"] = "Número de telefone inválido"
      isValid = false
    }

    setFieldErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    // Validate form
    if (!validateForm(form)) {
      setFormStatus({
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios corretamente.",
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({})

    try {
      const formData = new FormData(form)

      // Replace the phone field with our formatted phone number
      formData.set("phone", phoneNumber)

      const result = await submitToHubSpot(formData, portalId, formId)

      setFormStatus({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        form.reset()
        setPhoneNumber("")
        setFieldErrors({})
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Clear error for this field if it has a value
    if (value && fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
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
        <form className="grid gap-4" onSubmit={handleSubmit} id={`hubspot-form-${formId}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm font-medium leading-none">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                id="firstname"
                name="firstname"
                className={`flex h-10 w-full rounded-md border ${fieldErrors.firstname ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Digite seu nome"
                required
                disabled={isSubmitting}
                onChange={handleInputChange}
              />
              {fieldErrors.firstname && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.firstname}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastname" className="text-sm font-medium leading-none">
                Sobrenome <span className="text-red-500">*</span>
              </label>
              <input
                id="lastname"
                name="lastname"
                className={`flex h-10 w-full rounded-md border ${fieldErrors.lastname ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Digite seu sobrenome"
                required
                disabled={isSubmitting}
                onChange={handleInputChange}
              />
              {fieldErrors.lastname && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.lastname}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`flex h-10 w-full rounded-md border ${fieldErrors.email ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              placeholder="Digite seu email"
              required
              disabled={isSubmitting}
              onChange={handleInputChange}
            />
            {fieldErrors.email && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{fieldErrors.email}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Telefone <span className="text-red-500">*</span>
            </label>
            <CustomPhoneInput
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value || "")
                if (value && fieldErrors.phone) {
                  setFieldErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.phone
                    return newErrors
                  })
                }
              }}
              disabled={isSubmitting}
              placeholder="Digite seu telefone com DDD"
              required={true}
              onValidationChange={setIsPhoneValid}
            />
            {fieldErrors.phone && !phoneNumber && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{fieldErrors.phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="interesse" className="text-sm font-medium leading-none">
              Interesse <span className="text-red-500">*</span>
            </label>
            <select
              id="interesse"
              name="interesse"
              className={`flex h-10 w-full rounded-md border ${fieldErrors.interesse ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              required
              disabled={isSubmitting}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma opção</option>
              <option value="Programa Individual">Programa Individual</option>
              <option value="Programa Corporativo">Programa Corporativo</option>
              <option value="Outro">Outro</option>
            </select>
            {fieldErrors.interesse && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{fieldErrors.interesse}</span>
              </div>
            )}
          </div>

          {includeMessage && (
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium leading-none">
                Mensagem {messageRequired && <span className="text-red-500">*</span>}
              </label>
              <textarea
                id="message"
                name="message"
                className={`flex min-h-[120px] w-full rounded-md border ${fieldErrors.message ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Digite sua mensagem"
                required={messageRequired}
                disabled={isSubmitting}
                onChange={handleInputChange}
              ></textarea>
              {fieldErrors.message && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.message}</span>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Campos obrigatórios
          </div>

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
