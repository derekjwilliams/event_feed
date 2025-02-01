import { Feed } from 'feed'
import { Category, Extension } from 'feed/lib/typings'
import { EventsConnection } from '@/types/graphql'
import { generateIcsCalendar, VEvent, type VCalendar } from 'ts-ics'

export function generateFeed(events: EventsConnection) {
  const feed = new Feed({
    title: 'Willamette Events Feed',
    description: 'Stay updated with the latest events!',
    id: process.env.EVENTS_PAGE_LINK || 'http://localhost:3000/api',
    link: process.env.EVENTS_PAGE_LINK || 'http://localhost:3000/api',
    language: 'en',
    favicon:
      process.env.EVENTS_PAGE_FAVICON || 'http://localhost:3000/icon.png',
    copyright: 'All rights reserved 2025, Derek J. Williams',
    updated: new Date(),
    generator: 'feed package',
    feedLinks: {
      rss: process.env.RSS_EVENTS_FEED_LINK || 'http://localhost:3000/api/rss',
      atom:
        process.env.ATOM_EVENTS_FEED_LINK || 'http://localhost:3000/api/atom',
    },
  })
  if (events.nodes) {
    events.nodes.forEach((event) => {
      if (event) {
        const categories: Category[] = []
        event.eventTagsByEventId.nodes.forEach((node) => {
          if (node && node.tagByTagId) {
            categories.push({
              name: node.tagByTagId.name,
              domain: 'Willamette-events',
            })
          }
        })
        let title = event.title ?? ''
        if (title && event.eventStartDate) {
          title = title + ' - ' + new Date(event.eventStartDate).toDateString()
        }

        const startDate: Extension = {
          name: 'startAndEndTimes',
          objects: {
            start: event.eventStartDate,
            end: event.eventEndDate ? event.eventEndDate : event.eventStartDate,
          },
        }
        // TODO fixup this feed item, e.g. id, link, feedLinks are all incorrect
        feed.addItem({
          image:
            event.imageUrl && event.imageUrl.trim() !== ''
              ? event.imageUrl
              : process.env.DEFAULT_FEED_ITEM_IMAGE_URL,
          title: title,
          id: event.id.toString(),
          link: event.link ? `https://events.willamette.edu${event.link}` : '',
          description: event.description ?? '',
          content: event.content ?? '',
          author: [
            { name: event.author ?? '', email: 'events_creator@example.com' },
          ],
          published: event.pubDate ? new Date(event.pubDate) : undefined,
          date: event.eventStartDate
            ? new Date(event.eventStartDate)
            : new Date(),
          extensions: [startDate],
          category: categories,
        })
      }
    })
  }
  return feed
}

export const generateICS = async (
  events: EventsConnection
): Promise<string> => {
  let vEvents: VEvent[] = []

  if (events.nodes && events.nodes.length > 0) {
    vEvents = []

    events.nodes.forEach((event) => {
      if (event) {
        const uid =
          process.env.NEXT_PUBLIC_ICS_UID ||
          'c109d7e6-4b6d-46b4-8b9f-8b9e3f0d1e7@event-feed-willamette.vercel'

        const start = event.eventStartDate
          ? new Date(event.eventStartDate)
          : new Date()
        const end = event.eventEndDate
          ? new Date(event.eventEndDate)
          : new Date()

        const categories = event.eventTagsByEventId.nodes
          .filter((tag) => tag && tag.tagByTagId && tag.tagByTagId.name)
          .map((tag) => tag!.tagByTagId!.name as string)

        let e: VEvent = {
          start: { date: start },
          stamp: { date: start },
          end: { date: end },
          summary: event.title,
          description: event.description ?? '',
          uid: uid + `/${event.link}`,
          url: event.link ? `https://events.willamette.edu${event.link}` : '',
          categories: categories,
        }
        vEvents.push(e)
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
