import { NextResponse } from "next/server"

function generateICS(): string {
  // Event details
  const eventTitle = "English Night Live – Hub Academy Immersive Meetup"
  const eventLocation = "Av. Paulista, 1374 - 12º andar - Brazilian Financial Center, São Paulo"
  const eventDescription =
    "Uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo. Pratique inglês em dinâmicas reais de negócios, desenvolva soft skills estratégicas e conecte-se com profissionais de diversas áreas."

  // Event date: October 22, 2025, 18:30 (Brazil/Sao Paulo timezone = UTC-3)
  // Converting to UTC: 18:30 BRT = 21:30 UTC
  const startDate = "20251022T213000Z" // 2025-10-22 21:30:00 UTC
  const endDate = "20251022T233000Z" // 2025-10-22 23:30:00 UTC (2 hours duration)

  // Generate unique ID
  const uid = `meetup-${Date.now()}@hubacademybr.com`

  // Current timestamp in ICS format
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

  // Build ICS content
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

export async function GET() {
  try {
    const icsContent = generateICS()

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="english-night-live-meetup.ics"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error generating ICS file:", error)
    return NextResponse.json({ ok: false, error: "Failed to generate calendar file" }, { status: 500 })
  }
}

// Reject other methods
export async function POST() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })
}


