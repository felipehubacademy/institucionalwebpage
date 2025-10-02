/**
 * Microsoft Graph API integration for sending emails
 */

interface EmailOptions {
  to: string
  subject: string
  htmlBody: string
  fromEmail: string
  icsAttachment?: string
}

export async function sendEmail(
  options: EmailOptions,
  accessToken: string,
): Promise<{ success: boolean; messageId?: string }> {
  try {
    const message: any = {
      message: {
        subject: options.subject,
        body: {
          contentType: "HTML",
          content: options.htmlBody,
        },
        toRecipients: [
          {
            emailAddress: {
              address: options.to,
            },
          },
        ],
      },
      saveToSentItems: true,
    }

    // Add .ics attachment if provided
    if (options.icsAttachment) {
      const icsBase64 = Buffer.from(options.icsAttachment).toString('base64')
      message.message.attachments = [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: "english-night-live-meetup.ics",
          contentType: "text/calendar",
          contentBytes: icsBase64,
        },
      ]
    }

    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${options.fromEmail}/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Microsoft Graph API error:", errorText)
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending email via Microsoft Graph:", error)
    throw error
  }
}

export function generateMeetupConfirmationEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação – English Night Live</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #161533; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #a3ff3c; margin: 0; font-size: 28px;">English Night Live</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">Hub Academy Meetup</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #161533; margin-top: 0;">Olá, ${firstName}! 👋</h2>
    
    <p style="font-size: 16px;">
      Sua inscrição no <strong>English Night Live</strong> foi confirmada com sucesso! 🎉
    </p>
    
    <div style="background-color: #ffffff; border-left: 4px solid #a3ff3c; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">📅 Detalhes do Evento</h3>
      <p style="margin: 10px 0;"><strong>Data:</strong> 22 de Outubro de 2025</p>
      <p style="margin: 10px 0;"><strong>Horário:</strong> 18h30</p>
      <p style="margin: 10px 0;"><strong>Local:</strong> Av. Paulista, 1374 - 12º andar - Brazilian Financial Center</p>
    </div>
    
    <p style="font-size: 16px;">
      Esta será uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo.
    </p>
    
    <div style="background-color: #e8ffe8; padding: 20px; margin: 25px 0; border-radius: 5px;">
      <h3 style="color: #161533; margin-top: 0;">✅ O que você vai vivenciar:</h3>
      <ul style="padding-left: 20px; margin: 10px 0;">
        <li>Prática de inglês em dinâmicas reais de negócios</li>
        <li>Desenvolvimento de soft skills estratégicas</li>
        <li>Networking com profissionais de diversas áreas</li>
      </ul>
    </div>
    
    <p style="font-size: 16px;">
      Em breve, enviaremos mais informações sobre o local exato e orientações para o dia do evento.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hubacademybr.com/meetup-obrigado" 
         style="display: inline-block; background-color: #a3ff3c; color: #161533; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
        Ver Confirmação
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Caso tenha alguma dúvida, entre em contato conosco pelo e-mail 
      <a href="mailto:contato@hubacademybr.com" style="color: #161533;">contato@hubacademybr.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
    </p>
  </div>
</body>
</html>
  `.trim()
}

export function generateICSContent(): string {
  const eventTitle = "English Night Live – Hub Academy Immersive Meetup"
  const eventLocation = "Av. Paulista, 1374 - 12º andar - Brazilian Financial Center, São Paulo"
  const eventDescription =
    "Uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo."

  const uid = `meetup-${Date.now()}@hubacademybr.com`
  const now = new Date()
  const timestamp =
    now.getUTCFullYear() +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0") +
    "T" +
    String(now.getUTCHours()).padStart(2, "0") +
    String(now.getUTCMinutes()).padStart(2, "0") +
    String(now.getUTCSeconds()).padStart(2, "0") +
    "Z"

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hub Academy//English Night Live//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:English Night Live",
    "X-WR-TIMEZONE:America/Sao_Paulo",
    "BEGIN:VTIMEZONE",
    "TZID:America/Sao_Paulo",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0300",
    "TZOFFSETTO:-0300",
    "TZNAME:BRT",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;TZID=America/Sao_Paulo:20251022T183000`,
    `DTEND;TZID=America/Sao_Paulo:20251022T203000`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}`,
    `LOCATION:${eventLocation}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "DESCRIPTION:Lembrete: English Night Live amanhã às 18h30",
    "ACTION:DISPLAY",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "DESCRIPTION:Lembrete: English Night Live em 2 horas",
    "ACTION:DISPLAY",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  return icsContent
}
