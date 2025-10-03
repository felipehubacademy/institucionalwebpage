"use client"

import { useState, useEffect } from "react"
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
  placeholder = "11 99999-9999",
  required = false,
  onValidationChange,
}: PhoneInputProps) {
  const [mounted, setMounted] = useState(false)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Parse initial value (remove +55 if present)
  useEffect(() => {
    if (value) {
      const cleanValue = value.replace(/[^\d]/g, "")
      if (cleanValue.startsWith("55")) {
        const numberWithoutCountry = cleanValue.slice(2)
        // Format the number for display
        if (numberWithoutCountry.length <= 2) {
          setPhoneNumber(numberWithoutCountry)
        } else if (numberWithoutCountry.length <= 7) {
          setPhoneNumber(`${numberWithoutCountry.slice(0, 2)} ${numberWithoutCountry.slice(2)}`)
        } else {
          setPhoneNumber(`${numberWithoutCountry.slice(0, 2)} ${numberWithoutCountry.slice(2, 7)}-${numberWithoutCountry.slice(7, 11)}`)
        }
      } else {
        // Format the number for display
        if (cleanValue.length <= 2) {
          setPhoneNumber(cleanValue)
        } else if (cleanValue.length <= 7) {
          setPhoneNumber(`${cleanValue.slice(0, 2)} ${cleanValue.slice(2)}`)
        } else {
          setPhoneNumber(`${cleanValue.slice(0, 2)} ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`)
        }
      }
    }
  }, [value])

  // Update parent when phone changes (backend will add +55)
  useEffect(() => {
    // Send clean number to parent (without formatting)
    const cleanNumber = phoneNumber.replace(/\D/g, "")
    onChange(cleanNumber)
    
    if (touched) {
      validatePhoneNumber(phoneNumber)
    }
  }, [phoneNumber, onChange, touched])

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

  // Validate Brazilian mobile phone number
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

    // Clean phone number for validation
    const cleanNumber = phoneNumber.replace(/\D/g, "")

    // Brazilian mobile validation: 11 digits (2 DDD + 9 number)
    if (cleanNumber.length === 11) {
      const ddd = cleanNumber.slice(0, 2)
      const validDDDs = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"]
      
      if (validDDDs.includes(ddd)) {
        // Check if it's a mobile number (starts with 9)
        const number = cleanNumber.slice(2)
        if (number.startsWith("9")) {
          setError(null)
          onValidationChange?.(true)
        } else {
          setError("Número deve ser um celular (começar com 9)")
          onValidationChange?.(false)
        }
      } else {
        setError("DDD inválido")
        onValidationChange?.(false)
      }
    } else {
      setError("Número deve ter 11 dígitos (DDD + 9 dígitos)")
      onValidationChange?.(false)
    }
  }

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneValue = e.target.value.replace(/\D/g, "")
    
    // Auto-format for Brazilian mobile numbers (11 digits)
    if (phoneValue.length === 0) {
      phoneValue = ""
    } else if (phoneValue.length <= 2) {
      phoneValue = phoneValue
    } else if (phoneValue.length <= 7) {
      phoneValue = `${phoneValue.slice(0, 2)} ${phoneValue.slice(2)}`
    } else {
      phoneValue = `${phoneValue.slice(0, 2)} ${phoneValue.slice(2, 7)}-${phoneValue.slice(7, 11)}`
    }
    
    setPhoneNumber(phoneValue)
    if (!touched) setTouched(true)
  }

  if (!mounted) {
    return (
      <div className="flex h-14 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3">
        <input
          type="tel"
          className="flex-1 bg-transparent text-base font-medium placeholder:text-gray-400 focus:outline-none"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
      </div>
    )
  }

  return (
    <div>
      <div className={`flex h-14 w-full rounded-xl border-2 ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"} focus-within:border-[#a3ff3c] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a3ff3c]/10 px-4 py-3 transition-all`}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={() => setTouched(true)}
          className="flex-1 bg-transparent text-base font-medium placeholder:text-gray-400 focus:outline-none"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={15} // Allow for formatting characters
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
