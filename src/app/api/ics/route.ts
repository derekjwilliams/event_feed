import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import { EVENTS_QUERY } from '@/graphql_queries/queries'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pubDate = searchParams.get('pubDate') || '2025-01-01'
  const tagNames = searchParams.get('tagNames')?.split(',') || []

  try {
    const events = await fetchEvents(pubDate, tagNames)
    const icsData = generateICS(events)

    return new NextResponse(icsData, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="events.ics"',
      },
    })
  } catch (error) {
    console.error('Error generating ICS:', error)
    return NextResponse.json(
      { error: 'Failed to generate calendar file' },
      { status: 500 }
    )
  }
}
import { Event } from '@/types/graphql'

const fetchEvents = async (
  pubDate: string,
  tagNames: string[]
): Promise<Event[]> => {
  const query = EVENTS_QUERY
  const res = await fetch(process.env.GRAPHQL_ENDPOINT || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { pubDate, tagNames } }),
  })

  const { data } = await res.json()
  return data.getEventsByDateAndTags.nodes
}

const generateICS = (events: Event[]): string => {
  let icsContent =
    'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Willamette//Event Calendar//EN\n'

  events.forEach((event) => {
    const start = event.eventStartDate
      ? format(new Date(event.eventStartDate), "yyyyMMdd'T'HHmmss'Z'")
      : ''
    const end = event.eventEndDate
      ? format(new Date(event.eventEndDate), "yyyyMMdd'T'HHmmss'Z'")
      : ''

    icsContent += `
      BEGIN:VEVENT
      UID:${event.id}@yourapp.com
      SUMMARY:${event.title}
      DESCRIPTION:${event.description || ''}
      LOCATION:${event.link || ''}
      DTSTART:${start}
      DTEND:${end}
      END:VEVENT
      `
  })

  icsContent += 'END:VCALENDAR'
  return icsContent
}
