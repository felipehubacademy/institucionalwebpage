"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Country data with flags, names, and dial codes
const countries = [
  { code: "BR", name: "Brasil", flag: "🇧🇷", dialCode: "+55" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "PE", name: "Peru", flag: "🇵🇪", dialCode: "+51" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  // Add more countries as needed
]

interface PhoneInputProps {
  id: string
  name: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  onChange?: (formattedValue: string) => void
}

export default function PhoneInput({
  id,
  name,
  required = false,
  disabled = false,
  placeholder = "Digite seu telefone",
  className,
  onChange,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [areaCode, setAreaCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [formattedValue, setFormattedValue] = useState("")

  // Format the phone number as the user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format based on length
    if (digits.length <= 4) {
      return digits
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`
    } else {
      return `${digits.slice(0, 4)}-${digits.slice(4, 8)}${digits.slice(8) ? `-${digits.slice(8)}` : ""}`
    }
  }

  // Handle area code input
  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      setAreaCode(value)
    }
  }

  // Handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
  }

  // Update the hidden input with the full formatted phone number
  useEffect(() => {
    if (selectedCountry && areaCode) {
      const formatted = `${selectedCountry.dialCode}-${areaCode}-${phoneNumber}`
      setFormattedValue(formatted)
      if (onChange) {
        onChange(formatted)
      }
    } else {
      setFormattedValue("")
    }
  }, [selectedCountry, areaCode, phoneNumber, onChange])

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          {/* Country code dropdown */}
          <div className="relative">
            <Button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
              disabled={disabled}
            >
              <span className="text-base">{selectedCountry.flag}</span>
              <span>{selectedCountry.dialCode}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-56 max-h-60 overflow-auto rounded-md bg-background border border-input shadow-lg">
                <div className="py-1">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-muted",
                        selectedCountry.code === country.code ? "bg-muted" : "",
                      )}
                      onClick={() => {
                        setSelectedCountry(country)
                        setDropdownOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-muted-foreground">{country.dialCode}</span>
                      </div>
                      {selectedCountry.code === country.code && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Area code input */}
          <div className="w-16">
            <input
              type="text"
              value={areaCode}
              onChange={handleAreaCodeChange}
              placeholder="DDD"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
              required={required}
            />
          </div>

          {/* Phone number input */}
          <div className="flex-1">
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder={placeholder}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
              required={required}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Exemplo: {selectedCountry.flag} {selectedCountry.dialCode}-11-98765-4321
        </p>
      </div>

      {/* Hidden input to store the formatted value for form submission */}
      <input type="hidden" id={id} name={name} value={formattedValue} required={required} />
    </div>
  )
}
