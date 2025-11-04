"use client"

import { useState, useEffect } from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function PhoneInput({
  value,
  onChange,
  className = "",
  placeholder = "(11) 9 9999-9999",
  disabled = false,
}: PhoneInputProps) {
  const [formattedValue, setFormattedValue] = useState("")

  useEffect(() => {
    // Format phone number for display
    const digits = value.replace(/\D/g, "")
    if (digits.length === 0) {
      setFormattedValue("")
    } else if (digits.length <= 2) {
      setFormattedValue(`(${digits}`)
    } else if (digits.length <= 7) {
      setFormattedValue(`(${digits.slice(0, 2)}) ${digits.slice(2)}`)
    } else if (digits.length <= 11) {
      setFormattedValue(
        `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
      )
    } else {
      setFormattedValue(
        `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
      )
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const digits = input.replace(/\D/g, "")
    // Limit to 11 digits (Brazilian mobile)
    const limitedDigits = digits.slice(0, 11)
    onChange(limitedDigits)
  }

  return (
    <input
      type="tel"
      value={formattedValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  )
}
