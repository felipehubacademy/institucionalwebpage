"use client"

import { useState, useEffect } from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import flags from "react-phone-number-input/flags"
import { isValidPhoneNumber } from "react-phone-number-input"
import { AlertCircle } from "lucide-react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  required?: boolean
  onValidationChange?: (isValid: boolean) => void
}

export default function CustomPhoneInput({
  value,
  onChange,
  disabled = false,
  placeholder = "Digite seu telefone com DDD",
  required = false,
  onValidationChange,
}: PhoneInputProps) {
  const [mounted, setMounted] = useState(false)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Validate phone number when value changes
  useEffect(() => {
    if (value && touched) {
      validatePhoneNumber(value)
    } else if (!value && required && touched) {
      setError("Telefone é obrigatório")
      onValidationChange?.(false)
    } else if (!value && !required) {
      setError(null)
      onValidationChange?.(true)
    } else if (!touched) {
      // Initial state - if required, mark as invalid until touched
      onValidationChange?.(!required)
    }
  }, [value, touched, required, onValidationChange])

  // Validate phone number
  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      if (required) {
        setError("Telefone é obrigatório")
        onValidationChange?.(false)
      } else {
        setError(null)
        onValidationChange?.(true)
      }
      return
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Número de telefone inválido")
      onValidationChange?.(false)
    } else {
      setError(null)
      onValidationChange?.(true)
    }
  }

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <input
        type="tel"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    )
  }

  return (
    <div className="phone-input-wrapper">
      <div className={`phone-input-container ${error ? "border-red-500" : ""}`}>
        <PhoneInput
          international
          defaultCountry="BR"
          flags={flags}
          value={value}
          onChange={(newValue) => {
            onChange(newValue || "")
            if (!touched) setTouched(true)
          }}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onBlur={() => setTouched(true)}
          className={error ? "phone-input-error" : ""}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
