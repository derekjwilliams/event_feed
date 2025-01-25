import { NextRequest, NextResponse } from 'next/server'
import { EVENTS_QUERY } from '@/graphql_queries/queries'
import { Event } from '@/types/graphql'
import { generateIcsCalendar, VEvent, type VCalendar } from 'ts-ics'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pubDate = searchParams.get('pubDate') || '1970-01-01'
  const tagNames = searchParams.get('tagNames')?.split(',') || []

  try {
    const events = await fetchEvents(pubDate, tagNames)
    const icsData = await generateICS(events)

    return new NextResponse(await icsData, {
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
const generateICS = async (events: Event[]): Promise<string> => {
  // const foo => (events: Event[]) : string => {

  let vEvents: VEvent[] = []

  if (events && events.length > 0) {
    vEvents = events.map((event) => {
      const uid =
        process.env.ICS_UID ||
        'e0bec92c-3f4b-4322-a772-a984545cab7e@event-feed-eta.vercel.app'
      const start = event.eventStartDate
        ? new Date(event.eventStartDate)
        : new Date()
      const end = event.eventStartDate //TODO fix when the DB has end dates
        ? new Date(event.eventStartDate)
        : new Date()
      const categories = event.eventTagsByEventId.nodes
        .filter((tag) => tag && tag.tagByTagId && tag.tagByTagId.name)
        .map((tag) => tag!.tagByTagId!.name as string)

      return {
        start: { date: start },
        stamp: { date: start },
        end: { date: end },
        summary: event.title,
        description: event.description ?? '',
        uid: uid + `/${event.link}`,
        url: event.link ? `https://events.willamette.edu${event.link}` : '',
        categories: categories,
      }
    })
  }
  const calendar: VCalendar = {
    prodId: 'event-feed-eta.vercel.app', // TODO
    version: '2.0',
    events: vEvents,
  }
  const icsCalendar = generateIcsCalendar(calendar)
  return icsCalendar
}
