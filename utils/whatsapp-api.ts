/**
 * WhatsApp Cloud API integration
 */

export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string,
  accessToken: string,
  phoneNumberId: string,
): Promise<{ success: boolean; messageId?: string }> {
  try {
    // Remove any non-digit characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, "")

    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "text",
        text: {
          body: message,
        },
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


