// Generate or fetch your ICS content
const generateIcsContent = () => {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your App//EN
BEGIN:VEVENT
SUMMARY:Next.js Meetup
DTSTART:20231001T180000Z
DTEND:20231001T200000Z
END:VEVENT
END:VCALENDAR`
}

export async function GET() {
  const icsContent = generateIcsContent()
  console.log('Calendar get')
  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename="calendar.ics"',
    },
  })
}
