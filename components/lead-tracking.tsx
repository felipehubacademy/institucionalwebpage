"use client"

import { useEffect } from "react"

/**
 * Componente para tracking de geração de lead na página de confirmação
 * Dispara eventos via dataLayer - GTM gerencia Meta Pixel, LinkedIn, etc
 */
export function LeadTracking() {
  useEffect(() => {
    // Aguardar um pouco para garantir que o GTM está carregado
    const timer = setTimeout(() => {
      // Disparar evento via dataLayer - GTM vai capturar e enviar para Meta Pixel, LinkedIn, etc
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "generate_lead",
          lead_type: "assessment",
          form_location: "assessment_landing",
          page_location: window.location.href,
          // Meta Pixel - evento Lead (GTM vai capturar e enviar)
          fb_event: "Lead",
          fb_content_name: "Assessment Gratuito",
          fb_content_category: "Assessment",
        })
      }
    }, 500) // Delay de 500ms para garantir que o GTM está carregado

    return () => clearTimeout(timer)
  }, [])

  return null // Componente não renderiza nada
}

