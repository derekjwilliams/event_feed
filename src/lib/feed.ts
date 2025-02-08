import { Feed } from 'feed'
import { Category, Extension } from 'feed/lib/typings'
import { EventsConnection } from '@/types/graphql'
import { generateIcsCalendar, VEvent, type VCalendar } from 'ts-ics'
interface EventData {
  // TODO export this from api/events or other
  event: {
    id: number
    title: string
    link: string
    description?: string
    content?: string
    date: string
    location?: string
    imageUrl?: string
    author?: string
    pubDate: string
    eventStartDate: string
    eventEndDate: string
    baseUrl: string
    geo_location: {
      x: number
      y: number
    }
  }
  tags: string[]
}

export function generateFeedFromREST(response: EventData[]) {
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
  console.log('generateFeedFromREST')
  if (response) {
    // console.log(JSON.stringify(response, null, 2))

    response.forEach((item) => {
      if (item.event) {
        const categories: Category[] = []
        item.tags.forEach((tag) => {
          categories.push({
            name: tag,
            domain: 'Willamette-events', // TODO domain should be for each feed
          })
        })
        let title = item.event.title ?? ''
        if (title && item.event.eventStartDate) {
          title =
            title + ' - ' + new Date(item.event.eventStartDate).toDateString()
        }

        const startDate: Extension = {
          name: 'startDate',
          objects: {
            date: item.event.eventStartDate,
          },
        }
        // TODO fixup this feed item, e.g. id, link, feedLinks are all incorrect
        feed.addItem({
          image:
            item.event.imageUrl && item.event.imageUrl.trim() !== ''
              ? item.event.imageUrl
              : process.env.DEFAULT_FEED_ITEM_IMAGE_URL,
          title: item.event.title,
          id: item.event.id.toString(),
          link: item.event.link
            ? `${item.event.baseUrl}${item.event.link}` //TODO us base
            : '',
          description: item.event.description ?? '',
          content: item.event.content ?? '',
          author: [
            {
              name: item.event.author ?? '',
              email: 'events_creator@example.com',
            },
          ],
          published: item.event.pubDate
            ? new Date(item.event.pubDate)
            : undefined,
          date: item.event.eventStartDate
            ? new Date(item.event.eventStartDate)
            : new Date(),
          extensions: [startDate],
          category: categories,
        })
      }
    })
  }
  return feed
}

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
          name: 'startDate',
          objects: {
            date: event.eventStartDate,
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

export const generateICSFromREST = async (
  data: EventData[]
): Promise<string> => {
  let vEvents: VEvent[] = []

  if (data && data.length > 0) {
    vEvents = []

    data.forEach((item) => {
      if (item.event) {
        const uid =
          process.env.ICS_UID ||
          'e0bec92c-3f4b-4322-a772-a984545cab6e@event-feed-eta.vercel.app'

        const start = item.event.eventStartDate
        const end = item.event.eventEndDate // TODO: fix when the DB has end dates

        const categories = item.tags

        vEvents.push({
          start: { date: new Date(start) },
          stamp: { date: new Date(start) },
          end: { date: new Date(end) },
          summary: item.event.title,
          description: item.event.description ?? '',
          uid: uid + `/${item.event.link}`,
          url: `${item.event.baseUrl}${item.event.link}`,
          categories: categories,
        })
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
