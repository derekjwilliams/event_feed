import { Feed } from 'feed'
import { Category, Extension } from 'feed/lib/typings'
import { generateIcsCalendar, VEvent, type VCalendar } from 'ts-ics'
import env from '@/env'
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

export function generateFeed(data: EventData[]) {
  const feed = new Feed({
    title: 'Willamette Events Feed',
    description: 'Stay updated with the latest events!',
    id: env.EVENTS_PAGE_LINK,
    link: env.EVENTS_PAGE_LINK,
    language: 'en',
    favicon: env.EVENTS_PAGE_FAVICON, // TODO verify on Vercel
    copyright: 'All rights reserved 2025, Derek J. Williams',
    updated: new Date(),
    generator: 'feed package',
    feedLinks: {
      rss: env.RSS_EVENTS_FEED_LINK,
      atom: env.ATOM_EVENTS_FEED_LINK,
      ics: env.ICS_EVENTS_FEED_LINK,
      json1: env.JSON1_EVENTS_FEED_LINK,
    },
  })
  if (data) {
    data.forEach((item) => {
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

export const generateICS = async (data: EventData[]): Promise<string> => {
  let vEvents: VEvent[] = []

  if (data && data.length > 0) {
    vEvents = []

    data.forEach((item) => {
      if (item.event) {
        const uid =
          process.env.ICS_UID ||
          'e0bec92c-3f4b-4322-a772-a984545cab6e@event_feed.vercel.app'

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
