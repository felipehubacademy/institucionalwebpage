import { NextRequest, NextResponse } from "next/server"
import { leadSchema, sanitizePhone } from "@/lib/validations/lead"
import { upsertContact, createDeal, getUTMSource } from "@/lib/hubspot/client"
import { rateLimit, getClientIP } from "@/lib/rate-limit"

/**
 * POST /api/lead
 * 
 * Processa lead do formulário de assessment:
 * 1. Valida dados com Zod
 * 2. Aplica rate limiting
 * 3. Sanitiza telefone
 * 4. Upsert contato no HubSpot
 * 5. Cria Deal associado
 * 
 * TODO: Implementar reCAPTCHA v3
 * 1. Instalar: npm install react-google-recaptcha-v3
 * 2. Adicionar verificação no client-side antes de enviar
 * 3. Validar token no servidor usando RECAPTCHA_SECRET_KEY
 * 4. Ver documentação: https://developers.google.com/recaptcha/docs/v3
 */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request.headers)
    const rateLimitResult = await rateLimit(clientIP)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.",
        },
        { status: 429 }
      )
    }

    // Parse e validação
    const body = await request.json()
    const validationResult = leadSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Validar consentimento
    if (!data.consent) {
      return NextResponse.json(
        {
          error: "Você deve concordar com os termos para continuar",
        },
        { status: 400 }
      )
    }

    // Sanitizar telefone
    const sanitizedPhone = sanitizePhone(data.phone)

    if (sanitizedPhone.length < 10) {
      return NextResponse.json(
        {
          error: "Telefone inválido",
        },
        { status: 400 }
      )
    }

    // TODO: Verificar reCAPTCHA token aqui
    // const recaptchaToken = body.recaptchaToken
    // if (!recaptchaToken) {
    //   return NextResponse.json({ error: "reCAPTCHA validation failed" }, { status: 400 })
    // }
    // const recaptchaResponse = await verifyRecaptcha(recaptchaToken)
    // if (!recaptchaResponse.success) {
    //   return NextResponse.json({ error: "reCAPTCHA validation failed" }, { status: 400 })
    // }

    // HubSpot Integration
    const utmSource = getUTMSource({
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
    })

    // Upsert contato
    const contact = await upsertContact({
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: sanitizedPhone,
      company: data.company,
      jobtitle: data.role,
      hub_level: data.level,
      preferred_time: data.preferredTime,
      lgpd_consent: true,
      source: utmSource || "direct",
    })

    // Criar Deal
    const dealName = `Assessment – ${data.firstName} ${data.lastName} – ${data.company || "Pessoa Física"}`
    const pipelineId = process.env.HUBSPOT_PIPELINE_ID
    const dealStageId = process.env.HUBSPOT_DEAL_STAGE_ID

    if (!pipelineId || !dealStageId) {
      console.error("HUBSPOT_PIPELINE_ID ou HUBSPOT_DEAL_STAGE_ID não configurados")
      // Ainda retorna sucesso, mas loga o erro
    } else {
      await createDeal(
        {
          dealname: dealName,
          pipeline: pipelineId,
          dealstage: dealStageId,
        },
        contact.vid
      )
    }

    // Sucesso
    return NextResponse.json(
      {
        success: true,
        message: "Lead cadastrado com sucesso",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error processing lead:", error)

    // Mensagem amigável para o usuário
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      },
      { status: 400 }
    )
  }
}

