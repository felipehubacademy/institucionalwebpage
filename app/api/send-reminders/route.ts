import { NextRequest, NextResponse } from "next/server"
import { fetchQualifiedDeals, fetchContactFromDeal, markReminderAsSent } from "@/utils/hubspot-reminders"
import { generateReminderEmail } from "@/utils/reminder-templates"
import { sendEmail } from "@/utils/microsoft-graph"
import { sendWhatsAppMessage } from "@/utils/whatsapp-api"

/**
 * Validate request authentication
 */
function validateAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization")
  const expectedToken = process.env.CRON_SECRET
  
  if (!expectedToken) {
    console.warn("CRON_SECRET not configured")
    return false
  }
  
  return authHeader === `Bearer ${expectedToken}`
}

/**
 * Map reminder type to WhatsApp template name
 */
function getWhatsAppTemplate(reminderType: string): string {
  const templateMap: Record<string, string> = {
    d7: "meetup_lembrete_d7",
    d3: "meetup_lembrete_d3_v2",
    d1: "meetup_lembrete_d1_v2",
  }
  
  return templateMap[reminderType] || "meetup_confirmacao_v2"
}

/**
 * Determine if email should be sent for this reminder type
 */
function shouldSendEmail(reminderType: string): boolean {
  return ["d7", "d1", "followup"].includes(reminderType)
}

/**
 * Determine if WhatsApp should be sent for this reminder type
 */
function shouldSendWhatsApp(reminderType: string): boolean {
  return ["d3", "d1"].includes(reminderType)
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate authentication
    if (!validateAuth(req)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await req.json()
    const { type } = body // 'd7' | 'd3' | 'd1' | 'followup'

    if (!type || !["d7", "d3", "d1", "followup"].includes(type)) {
      return NextResponse.json(
        { ok: false, error: "Invalid reminder type" },
        { status: 400 }
      )
    }

    // 3. Get environment variables
    const hubspotApiKey = process.env.HUBSPOT_API_KEY
    const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const msGraphFromEmail = process.env.MS_GRAPH_FROM_EMAIL || "hub@hubacademybr.com"

    if (!hubspotApiKey) {
      return NextResponse.json(
        { ok: false, error: "HubSpot API key not configured" },
        { status: 500 }
      )
    }

    // 4. Fetch qualified deals that need this reminder
    console.log(`Fetching deals for ${type} reminder...`)
    const deals = await fetchQualifiedDeals(type as 'd7' | 'd3' | 'd1', hubspotApiKey)

    if (deals.length === 0) {
      console.log(`No deals found needing ${type} reminder`)
      return NextResponse.json({
        ok: true,
        message: "No reminders to send",
        total: 0,
        sent: 0,
        failed: 0,
      })
    }

    // 5. Process each deal
    const results = {
      total: deals.length,
      sent: 0,
      failed: 0,
      errors: [] as any[],
    }

    for (const deal of deals) {
      try {
        // Fetch contact associated with deal
        const contact = await fetchContactFromDeal(deal.id, hubspotApiKey)

        if (!contact) {
          console.warn(`No contact found for deal ${deal.id}`)
          results.failed++
          results.errors.push({
            dealId: deal.id,
            dealName: deal.properties.dealname,
            error: "No contact associated",
          })
          continue
        }

        const { firstname, lastname, email, phone } = contact.properties

        // Send Email (D-7, D-1, followup)
        if (shouldSendEmail(type)) {
          try {
            const emailContent = generateReminderEmail(
              type as 'd7' | 'd3' | 'd1' | 'followup',
              { firstname, lastname, email }
            )

            await sendEmail({
              to: email,
              subject: emailContent.subject,
              htmlBody: emailContent.html,
              fromEmail: msGraphFromEmail,
            })

            console.log(`Email sent to ${email} (${type})`)
          } catch (emailError) {
            console.error(`Failed to send email to ${email}:`, emailError)
            // Don't fail the whole process, continue with WhatsApp
          }
        }

        // Send WhatsApp (D-3, D-1)
        if (shouldSendWhatsApp(type) && whatsappAccessToken && whatsappPhoneNumberId) {
          try {
            const templateName = getWhatsAppTemplate(type)
            
            await sendWhatsAppMessage(
              phone,
              firstname,
              whatsappAccessToken,
              whatsappPhoneNumberId,
              templateName
            )

            console.log(`WhatsApp sent to ${phone} (${type}, template: ${templateName})`)
          } catch (whatsappError) {
            console.error(`Failed to send WhatsApp to ${phone}:`, whatsappError)
            // Don't fail the whole process
          }
        }

        // Mark reminder as sent in HubSpot
        await markReminderAsSent(deal.id, type as 'd7' | 'd3' | 'd1', hubspotApiKey)

        results.sent++
        console.log(`✅ Reminder ${type} sent for deal ${deal.id} (${firstname} ${lastname})`)

      } catch (error: any) {
        console.error(`Failed to process deal ${deal.id}:`, error)
        results.failed++
        results.errors.push({
          dealId: deal.id,
          dealName: deal.properties.dealname,
          error: error.message || "Unknown error",
        })
      }
    }

    // 6. Return summary
    console.log(`Reminder ${type} summary: ${results.sent} sent, ${results.failed} failed`)
    
    return NextResponse.json({
      ok: true,
      type,
      summary: {
        total: results.total,
        sent: results.sent,
        failed: results.failed,
      },
      errors: results.errors,
    })

  } catch (error: any) {
    console.error("Send reminders error:", error)
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}

