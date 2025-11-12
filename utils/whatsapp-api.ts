/**
 * WhatsApp Cloud API integration
 */

export async function sendWhatsAppMessage(
  phoneNumber: string,
  firstName: string,
  accessToken: string,
  phoneNumberId: string,
  templateName: string = "meetup_confirmacao_v2", // Default: confirmação inicial
): Promise<{ success: boolean; messageId?: string }> {
  try {
    // Remove any non-digit characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, "")

    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "pt_BR"
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: firstName
                }
              ]
            }
          ]
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("WhatsApp API error:", errorData)
      throw new Error("Failed to send WhatsApp message")
    }

    const data = await response.json()
    return { success: true, messageId: data.messages?.[0]?.id }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    throw error
  }
}

/**
 * Envia notificação para o sales rep quando um novo lead é cadastrado
 */
export async function sendSalesRepNotification(
  salesRepPhone: string,
  leadName: string,
  leadPhone: string,
  accessToken: string,
  phoneNumberId: string,
): Promise<{ success: boolean; messageId?: string }> {
  try {
    console.log("📱 sendSalesRepNotification chamada:")
    console.log("   salesRepPhone:", salesRepPhone)
    console.log("   leadName:", leadName)
    console.log("   leadPhone:", leadPhone)
    console.log("   phoneNumberId:", phoneNumberId)
    
    // Remove any non-digit characters from phone numbers
    const cleanSalesRepPhone = salesRepPhone.replace(/\D/g, "")
    const cleanLeadPhone = leadPhone.replace(/\D/g, "")
    
    console.log("   cleanSalesRepPhone:", cleanSalesRepPhone)
    console.log("   cleanLeadPhone:", cleanLeadPhone)

    // Formatar telefone do lead para exibição (formato brasileiro)
    const formattedLeadPhone = formatPhoneForDisplay(cleanLeadPhone)
    console.log("   formattedLeadPhone:", formattedLeadPhone)

    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`
    console.log("   URL:", url)
    
    const requestBody = {
      messaging_product: "whatsapp",
      to: cleanSalesRepPhone,
      type: "template",
      template: {
        name: "novo_lead_notificacao_v2",
        language: {
          code: "pt_BR"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: leadName
              },
              {
                type: "text",
                text: `+${cleanLeadPhone}` // Número completo com + para WhatsApp reconhecer como clicável
              }
            ]
          }
        ]
      }
    }
    
    console.log("   Request body:", JSON.stringify(requestBody, null, 2))

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    console.log("   Response status:", response.status, response.statusText)
    
    const data = await response.json()
    console.log("   Response data:", JSON.stringify(data, null, 2))
    
    if (!response.ok) {
      console.error("❌ WhatsApp API error (sales rep notification):", data)
      throw new Error(`Failed to send sales rep notification: ${data.error?.message || "Unknown error"}`)
    }

    console.log("✅ Sales rep notification sent successfully")
    console.log("   Message ID:", data.messages?.[0]?.id)
    return { success: true, messageId: data.messages?.[0]?.id }
  } catch (error) {
    console.error("Error sending sales rep notification:", error)
    throw error
  }
}

/**
 * Formata telefone para exibição (formato brasileiro)
 * Exemplo: 5511987654321 -> (11) 98765-4321
 */
function formatPhoneForDisplay(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "")
  
  // Remove código do país (55) se presente
  const phoneWithoutCountry = cleanPhone.startsWith("55") ? cleanPhone.slice(2) : cleanPhone
  
  // Formata: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (phoneWithoutCountry.length === 11) {
    // Celular: (11) 98765-4321
    return `(${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 7)}-${phoneWithoutCountry.slice(7)}`
  } else if (phoneWithoutCountry.length === 10) {
    // Fixo: (11) 3456-7890
    return `(${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 6)}-${phoneWithoutCountry.slice(6)}`
  }
  
  // Retorna como está se não conseguir formatar
  return phoneWithoutCountry
}
