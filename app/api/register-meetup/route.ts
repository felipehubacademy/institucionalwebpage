import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/utils/rate-limit"
import { createOrUpdateContact, createDeal } from "@/utils/hubspot-crm"
import { sendWhatsAppMessage } from "@/utils/whatsapp-api"
import { sendEmail, generateMeetupConfirmationEmail } from "@/utils/microsoft-graph"

interface RegistrationData {
  firstname: string
  lastname: string
  email: string
  phone: string
  english_level: string
  lgpdConsent: boolean
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  honeypot?: string
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  return forwarded?.split(",")[0] || realIp || "unknown"
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limit (5 requests per minute per IP)
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 5,
      windowMs: 60000,
    })

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { ok: false, error: "Muitas tentativas. Por favor, aguarde um momento e tente novamente." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        },
      )
    }

    // Parse request body
    const data: RegistrationData = await request.json()

    // Check honeypot (should be empty)
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.warn("Honeypot triggered, possible bot submission")
      return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 })
    }

    // Validate required fields
    if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.english_level) {
      return NextResponse.json({ ok: false, error: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    // Validate LGPD consent
    if (!data.lgpdConsent) {
      return NextResponse.json({ ok: false, error: "Consentimento LGPD necessário" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedData = {
      firstname: sanitizeInput(data.firstname),
      lastname: sanitizeInput(data.lastname),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      english_level: sanitizeInput(data.english_level),
      utm_source: data.utm_source || "",
      utm_medium: data.utm_medium || "",
      utm_campaign: data.utm_campaign || "",
      utm_term: data.utm_term || "",
      utm_content: data.utm_content || "",
    }

    // Track partial failures
    const integrationResults = {
      hubspot: false,
      whatsapp: false,
      email: false,
    }

    // Get environment variables
    const hubspotApiKey = process.env.HUBSPOT_API_KEY
    const hubspotPipeline = process.env.HUBSPOT_MEETUP_PIPELINE || "default"
    const hubspotDealStage = process.env.HUBSPOT_MEETUP_DEALSTAGE || "appointmentscheduled"
    const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const msGraphAccessToken = process.env.MS_GRAPH_ACCESS_TOKEN
    const msGraphFromEmail = process.env.MS_GRAPH_FROM_EMAIL || "contato@hubacademybr.com"

    // HubSpot Integration
    if (hubspotApiKey) {
      try {
        // Create or update contact
        const contactResult = await createOrUpdateContact(
          {
            email: sanitizedData.email,
            firstname: sanitizedData.firstname,
            lastname: sanitizedData.lastname,
            phone: sanitizedData.phone,
            english_level: sanitizedData.english_level,
            utm_source: sanitizedData.utm_source,
            utm_medium: sanitizedData.utm_medium,
            utm_campaign: sanitizedData.utm_campaign,
            utm_term: sanitizedData.utm_term,
            utm_content: sanitizedData.utm_content,
          },
          hubspotApiKey,
        )

        // Create deal
        await createDeal(
          {
            dealname: `Meetup 22/10 - ${sanitizedData.firstname} ${sanitizedData.lastname}`,
            amount: "0",
            pipeline: hubspotPipeline,
            dealstage: hubspotDealStage,
            source: "Meetup Landing",
          },
          contactResult.id,
          hubspotApiKey,
        )

        integrationResults.hubspot = true
        console.log(`HubSpot: Contact ${contactResult.isNew ? "created" : "updated"}, deal created`)
      } catch (error) {
        console.error("HubSpot integration error:", error)
        // Don't fail the request, continue with other integrations
      }
    } else {
      console.warn("HubSpot API key not configured")
    }

    // WhatsApp Integration
    if (whatsappAccessToken && whatsappPhoneNumberId) {
      try {
        const whatsappMessage = `Olá, ${sanitizedData.firstname}! Inscrição confirmada no English Night Live – Hub Academy Immersive Meetup (22/10, 18h30, São Paulo - Av. Paulista). Em breve enviaremos mais detalhes. Até lá! 💬`

        await sendWhatsAppMessage(
          sanitizedData.phone,
          whatsappMessage,
          whatsappAccessToken,
          whatsappPhoneNumberId,
        )

        integrationResults.whatsapp = true
        console.log("WhatsApp message sent successfully")
      } catch (error) {
        console.error("WhatsApp integration error:", error)
        // Don't fail the request
      }
    } else {
      console.warn("WhatsApp credentials not configured")
    }

    // Email Integration (Microsoft Graph)
    if (msGraphAccessToken && msGraphFromEmail) {
      try {
        const emailHtml = generateMeetupConfirmationEmail(sanitizedData.firstname)

        await sendEmail(
          {
            to: sanitizedData.email,
            subject: "Confirmação – English Night Live (22/10, 18h30)",
            htmlBody: emailHtml,
            fromEmail: msGraphFromEmail,
          },
          msGraphAccessToken,
        )

        integrationResults.email = true
        console.log("Confirmation email sent successfully")
      } catch (error) {
        console.error("Email integration error:", error)
        // Don't fail the request
      }
    } else {
      console.warn("Microsoft Graph credentials not configured")
    }

    // Return success response
    const hasPartialFailures =
      !integrationResults.hubspot || !integrationResults.whatsapp || !integrationResults.email

    return NextResponse.json(
      {
        ok: true,
        partial: hasPartialFailures,
        integrationResults,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
        },
      },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { ok: false, error: "Erro ao processar inscrição. Por favor, tente novamente." },
      { status: 500 },
    )
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}


