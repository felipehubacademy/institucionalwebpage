"use client"

import { useState, useEffect } from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import flags from "react-phone-number-input/flags"
import { isValidPhoneNumber } from "react-phone-number-input"
import { AlertCircle, ChevronDown } from "lucide-react"

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
      <div className="flex h-14 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇧🇷</span>
          <span className="text-gray-500">+55</span>
          <input
            type="tel"
            className="flex-1 bg-transparent text-base font-medium placeholder:text-gray-400 focus:outline-none"
            placeholder={placeholder}
            disabled={disabled}
            required={required}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="phone-input-wrapper">
      <style jsx global>{`
        .phone-input-wrapper .PhoneInput {
          height: 56px;
        }
        
        .phone-input-wrapper .PhoneInputInput {
          height: 100%;
          border: none;
          background: transparent;
          font-size: 16px;
          font-weight: 500;
          color: #161533;
          padding-left: 0;
          outline: none;
        }
        
        .phone-input-wrapper .PhoneInputInput::placeholder {
          color: #9ca3af;
        }
        
        .phone-input-wrapper .PhoneInputCountrySelect {
          height: 100%;
          border: none;
          background: transparent;
          font-size: 16px;
          font-weight: 500;
          color: #161533;
          padding: 0 12px 0 8px;
          outline: none;
          cursor: pointer;
        }
        
        .phone-input-wrapper .PhoneInputCountryIcon {
          width: 24px;
          height: 18px;
          margin-right: 8px;
        }
        
        .phone-input-wrapper .PhoneInputCountrySelectArrow {
          color: #161533;
          margin-left: 4px;
        }
        
        .phone-input-wrapper .PhoneInput--focus .PhoneInputInput {
          outline: none;
        }
        
        .phone-input-wrapper .PhoneInput--focus .PhoneInputCountrySelect {
          outline: none;
        }
      `}</style>
      
      <div className={`phone-input-container flex h-14 w-full rounded-xl border-2 ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"} px-5 py-3 transition-all focus-within:border-[#a3ff3c] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a3ff3c]/10`}>
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
