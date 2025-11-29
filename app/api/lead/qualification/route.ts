import { NextRequest, NextResponse } from "next/server"
import { updateContactQualification, getContactByEmail } from "@/lib/hubspot/client"
import { formatPhoneForWhatsApp } from "@/lib/validations/lead"
import { sendWhatsAppMessage } from "@/utils/whatsapp-api"

/**
 * POST /api/lead/qualification
 * 
 * Finaliza o fluxo de qualificação:
 * 1. Atualiza contato no HubSpot com respostas de qualificação
 * 2. Envia mensagem WhatsApp para o lead
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, career_level, english_situation, english_pain_points, motivation } = body

    // Validação básica
    if (!email || !career_level || !english_situation || !english_pain_points || !motivation) {
      return NextResponse.json(
        {
          error: "Dados incompletos. Todas as respostas são obrigatórias.",
        },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "E-mail inválido",
        },
        { status: 400 }
      )
    }

    // Atualizar contato no HubSpot com propriedades de qualificação
    await updateContactQualification(email, {
      assessment_career_level: career_level,
      assessment_english_situation: english_situation,
      assessment_english_pain_points: english_pain_points,
      assessment_motivation: motivation,
    })

    console.log(`✅ Qualification data updated for contact: ${email}`)

    // Buscar contato para obter telefone e nome
    const contact = await getContactByEmail(email)

    if (!contact) {
      return NextResponse.json(
        {
          error: "Contato não encontrado",
        },
        { status: 404 }
      )
    }

    // Enviar mensagem WhatsApp para o lead
    const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

    if (whatsappAccessToken && whatsappPhoneNumberId && contact.phone) {
      try {
        // Formatar telefone para WhatsApp (sem +, só dígitos com 55)
        const phoneForWhatsApp = formatPhoneForWhatsApp(contact.phone)
        const firstName = contact.firstname || ""

        // Enviar mensagem para o lead
        await sendWhatsAppMessage(
          phoneForWhatsApp,
          firstName,
          whatsappAccessToken,
          whatsappPhoneNumberId,
          "assessment_confirmacao" // Template para assessment
        )

        console.log(`✅ WhatsApp message sent to lead: ${email}`)
      } catch (whatsappError: any) {
        console.error("❌ WhatsApp message error:", whatsappError)
        // Não falha a requisição se WhatsApp der erro, mas loga
        // A qualificação já foi salva no HubSpot
      }
    } else {
      console.warn("⚠️ WhatsApp credentials or phone not available - skipping WhatsApp message")
    }

    // Sucesso
    return NextResponse.json(
      {
        success: true,
        message: "Qualificação finalizada com sucesso",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error processing qualification:", error)

    // Mensagem amigável para o usuário
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao processar sua qualificação. Por favor, tente novamente.",
      },
      { status: 500 }
    )
  }
}

