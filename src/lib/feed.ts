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
  if (events.edges) {
    events.edges.forEach((edge) => {
      if (edge) {
        const categories: Category[] = []
        edge.node.eventTagsAsString?.split('|').forEach((tagname) => {
          if (tagname || tagname === '') {
            categories.push({
              name: tagname,
              domain: 'Willamette-events',
            })
          }
        })
        let title = edge.node.title ?? ''
        if (title && edge.node.eventStartDate) {
          title =
            title + ' - ' + new Date(edge.node.eventStartDate).toDateString()
        }

        const startDate: Extension = {
          name: 'startAndEndTimes',
          objects: {
            start: edge.node.eventStartDate,
            end: edge.node.eventEndDate
              ? edge.node.eventEndDate
              : edge.node.eventStartDate,
          },
        }
        // TODO fixup this feed item, e.g. id, link, feedLinks are all incorrect
        feed.addItem({
          image:
            edge.node.imageUrl && edge.node.imageUrl.trim() !== ''
              ? edge.node.imageUrl
              : process.env.DEFAULT_FEED_ITEM_IMAGE_URL,
          title: title,
          id: edge.node.id.toString(),
          link: edge.node.link
            ? `https://events.willamette.edu${edge.node.link}`
            : '',
          description: edge.node.description ?? '',
          content: edge.node.content ?? '',
          author: [
            {
              name: edge.node.author ?? '',
              email: 'events_creator@example.com',
            },
          ],
          published: edge.node.pubDate
            ? new Date(edge.node.pubDate)
            : undefined,
          date: edge.node.eventStartDate
            ? new Date(edge.node.eventStartDate)
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

  if (events.edges && events.edges.length > 0) {
    vEvents = []

    events.edges.forEach((edge) => {
      if (edge) {
        const uid =
          process.env.NEXT_PUBLIC_ICS_UID ||
          'e5486a1f-5a6d-44c3-83b3-4a3a4f5f6e7@event-feed'

        const start = edge.node.eventStartDate
          ? new Date(edge.node.eventStartDate)
          : new Date()
        const end = edge.node.eventEndDate
          ? new Date(edge.node.eventEndDate)
          : new Date()

        const categories = edge.node.eventTagsAsString
          ? edge.node.eventTagsAsString.split('|')
          : []
              .filter((tagname) => tagname || tagname === '')
              .map((tagname) => tagname)

        const e: VEvent = {
          start: { date: start },
          stamp: { date: start },
          end: { date: end },
          summary: edge.node.title,
          description: edge.node.description ?? '',
          uid:
            uid + `/${edge.node.link ? edge.node.link.replace(/^\//, '') : ''}`,
          url: edge.node.link
            ? `https://events.willamette.edu${edge.node.link}`
            : '',
          categories: categories,
        }
        if (edge.node.geoLocation) {
          e.geo =
            edge.node.geoLocation.coordinates[1] +
            ';' +
            edge.node.geoLocation.coordinates[0]
          if (edge.node.location) {
            e.location =
              e.location +
              ' - ' +
              edge.node.geoLocation.coordinates[1] +
              ',' +
              edge.node.geoLocation.coordinates[0]
          } else
            e.location =
              edge.node.geoLocation.coordinates[1] +
              ',' +
              edge.node.geoLocation.coordinates[0]
        } else if (edge.node.location) {
          e.location = e.location
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
