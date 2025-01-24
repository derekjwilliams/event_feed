import { Feed } from 'feed'
import { Category, Extension } from 'feed/lib/typings'
import { EventsConnection } from '@/types/graphql'
import { EVENTS_QUERY } from '@/graphql_queries/queries'

export function createFeed(events: EventsConnection) {
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
export async function fetchEvents(
  pubDate?: string,
  tagNames: string[] = []
): Promise<EventsConnection> {
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || ''
  if (GRAPHQL_ENDPOINT === '') {
    throw new Error(
      `No GRAPHQL_ENDPOINT environment variable not found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`
    )
  }
  if (!pubDate) {
    pubDate = new Date(0).toISOString() //'1970-01-01T00:00:00+00:00, for returning all events
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'sec-fetch-mode': 'cors',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: JSON.stringify({
      query: EVENTS_QUERY,
      variables: {
        pubDate: pubDate, //'2025-01-21T210:26:03.6308+00:00',
        tagNames: tagNames,
      },
      operationName: 'getEventsByDateAndTags',
    }),
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(
      `Failed to get events from graphql server at ${GRAPHQL_ENDPOINT}: ${response.statusText}. Query: ${EVENTS_QUERY}`
    )
  }
  const { data } = await response.json()
  return data?.getEventsByDateAndTags || []
}
