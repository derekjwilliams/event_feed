import { NextRequest, NextResponse } from 'next/server'
import { Feed } from 'feed'
import { Category } from 'feed/lib/typings'

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || ''

// TODO get these types from generated typescript types.
interface Tag {
  id: number
  name: string
}

interface EventTag {
  eventId: number
  nodeId: string
  tagId: number
  tagByTagId?: Tag
}
interface EventTagsConnection {
  nodes: Array<EventTag>;
}
interface Event {
  id: number
  author?: string
  title?: string
  description?: string
  content?: string
  link?: string
  pubDate?: string
  nodeId: string
  createdAt?: string
  updatedAt?: string
  eventTagsByEventId: EventTagsConnection;
}

export type EventsConnection = {
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  /** A list of `Event` objects. */
  nodes: Array<Event>;
  totalCount: number;
};

const EVENTS_QUERY = `
      query getEventsByDateAndTags($pubDate: String!, $tagNames: [String!]!) {
  getEventsByDateAndTags(pPubDate: $pubDate, pTagNames: $tagNames) {
    nodes {
      id
      author
      title
      description
      content
      link
      pubDate
      createdAt
      updatedAt
      eventTagsByEventId {
        nodes {
          tagByTagId {
            name
          }
        }
      }
    }
  }
}`


async function fetchEvents(pubDate?: string, tagNames: string[] =[]) : Promise<EventsConnection>{
  if (GRAPHQL_ENDPOINT === '') {
    throw new Error(`No GRAPHQL_ENDPOINT environment variable not found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`)
  }

  if (!pubDate) {
    pubDate = new Date(0).toISOString() //'1970-01-01T00:00:00+00:00, for returning all events
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "sec-fetch-mode": "cors",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: { pubDate : pubDate, tagNames: tagNames },        
      }),
  "method": "POST"
})
if (!response.ok) {
    throw new Error(`Failed to get events from graphql server at ${GRAPHQL_ENDPOINT}: ${response.statusText}. Query: ${EVENTS_QUERY}`)
  }
  const { data } = await response.json();
  return data?.getEventsByDateAndTags || [];
}

const generateRSSFeed = (events: EventsConnection) => {
  // TODO fixup this feed, e.g. id, link, feedLinks are all incorrect
  const feed = new Feed({
    title: 'Willamette Events RSS Feed',
    description: 'Stay updated with the latest events!',
    id: 'http://localhost:3000/api/rss',
    link: 'http://localhost:3000/api/rss',
    language: 'en',
    copyright: 'All rights reserved 2025, My RSS Feed',
    updated: new Date(),
    generator: 'feed package',
    feedLinks: {
      rss: 'http://localhost:3000/api/rss',
      atom: 'http://localhost:3000/api/rss/atom',
    },
  })
  events.nodes.forEach((event: Event) => {
    const categories: Category[] = [];
    event.eventTagsByEventId.nodes.forEach((node: EventTag) => {
      if (node.tagByTagId) {
        categories.push({ name: node.tagByTagId.name, domain: 'Willamette-events'})
      }
    })
// TODO fixup this feed item, e.g. id, link, feedLinks are all incorrect
    feed.addItem({
      title: event.title ?? 'None',
      id: event.id.toString(),
      link: event.link ?? '',
      description: event.description,
      content: event.content,
      author: [{ name: event.author }],
      published: event.pubDate ? new Date(event.pubDate) : undefined,
      date: event.pubDate ? new Date(event.pubDate) : new Date(),
      category: categories
    })
  })
  return feed.rss2(); // Generates the RSS XML
};

export async function GET(req: NextRequest) {
  try {
    // Request headers for caching
    const ifModifiedSince = req.headers.get('if-modified-since')
    const ifNoneMatch = req.headers.get('if-none-match');
    const modifiedSinceDate = ifModifiedSince ? new Date(ifModifiedSince).toISOString() : undefined

    const { searchParams } = new URL(req.url)
    const tagsParam = searchParams.get('tags')
    const tags = tagsParam ? tagsParam.split(',') : undefined

    const events = await fetchEvents(modifiedSinceDate, tags)

    const rssContent = generateRSSFeed(events);

    // Calculate ETag and Last-Modified headers

    const lastModified = events.nodes.length
  ? new Date(
      Math.max(
        ...events.nodes
          .map(node => node.pubDate ? new Date(node.pubDate).getTime() : new Date().getTime()) // Provide a fallback for undefined values
      )
    ).toUTCString()
  : new Date().toUTCString();

    const etag = `"${Buffer.from(rssContent).toString('base64').substring(0, 16)}"`;
    console.log(`ETag: ${etag}`)
    console.log(`Last-Modified: ${lastModified}`)

    // Respond with 304 if the feed hasn't changed
    if (ifNoneMatch === etag || ifModifiedSince === lastModified) {
      return new NextResponse(null, { status: 304 });
    }

    // Return the RSS feed with caching headers
    const headers = new Headers({
      'Content-Type': 'application/rss+xml',
      'Last-Modified': lastModified,
      'ETag': etag,
    });

    return new NextResponse(rssContent, { status: 200, headers });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json(
        // JSON.stringify(error),
        { message: error.message },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      return new NextResponse(
        JSON.stringify(error),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }
}
