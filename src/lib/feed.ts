import { Feed } from 'feed'
import { Category } from 'feed/lib/typings'
import { EventsConnection } from '@/types/graphql'
import { EVENTS_QUERY } from '@/graphql_queries/queries'

export function createFeed(events: EventsConnection) {
  const feed = new Feed({
    title: 'Willamette Events RSS Feed',
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
        // TODO fixup this feed item, e.g. id, link, feedLinks are all incorrect
        feed.addItem({
          title: event.title ?? 'None',
          id: event.id.toString(),
          link: event.link ?? '',
          description: event.description ?? '',
          content: event.content ?? '',
          author: [{ name: event.author ?? '' }],
          published: event.pubDate ? new Date(event.pubDate) : undefined,
          date: event.pubDate ? new Date(event.pubDate) : new Date(),
          category: categories,
        })
      }
    })
  }
  return feed
}
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || ''
export async function fetchEvents(
  pubDate?: string,
  tagNames: string[] = []
): Promise<EventsConnection> {
  if (GRAPHQL_ENDPOINT === '') {
    throw new Error(
      `No GRAPHQL_ENDPOINT environment variable not found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`
    )
  }
  if (!pubDate) {
    pubDate = new Date(0).toISOString() //'1970-01-01T00:00:00+00:00, for returning all events
  }

  console.log('pubDate in fetch: ', pubDate)

  const response = await fetch(GRAPHQL_ENDPOINT, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'sec-fetch-mode': 'cors',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    // body: '{"query":"query getEventsByDateAndTags($pubDate: String!, $tagNames: [String!]!) {\\n  getEventsByDateAndTags(pPubDate: $pubDate, pTagNames: $tagNames) {\\n    nodes {\\n      id\\n      author\\n      title\\n      description\\n      content\\n      link\\n      pubDate\\n      createdAt\\n      updatedAt\\n      eventTagsByEventId {\\n        nodes {\\n          tagByTagId {\\n            name\\n          }\\n        }\\n      }\\n    }\\n  }\\n}\\n\\n# {\\n#   query {\\n#     node\\n#   }\\n#   getEventsByDateAndTags {\\n#     nodes {\\n#       description\\n#     }\\n#   }\\n# }\\n\\n# query getEventsByDateAndTags($pubDate: String!, $tagNames: [String!]!) {getEventsByDateAndTags(pPubDate: $pubDate, pTagNames: $tagNames) {nodes {description}}}\\n","variables":{"pubDate":"2025-01-25T21:26:03.6308+00:00","tagNames":[]},"operationName":"getEventsByDateAndTags"}',
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
