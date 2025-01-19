import { NextRequest, NextResponse } from 'next/server'
import { Feed } from 'feed'
import { Category } from 'feed/lib/typings'

const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql'

interface Event {
  id: string
  title: string
  description: string
  content: string
  author: string
  date: Date
  tags: [string]
}

const EVENTS_QUERY = `
  query GetEvents($modifiedSince: String, $tags: [String!]) {
    events(modifiedSince: $modifiedSince, tags: $tags) {
      id
      author
      title
      description
      date
      content
      tags
    }
  }
`;

async function fetchEvents(modifiedSince?: string, tags?: string[]): Promise<Event[]> {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: { modifiedSince, tags },
      }),
    })

  if (!response.ok) {
    throw new Error(`Failed to get events from graphql server at ${GRAPHQL_ENDPOINT}: ${response.statusText}. Query: ${EVENTS_QUERY}`)
  }

  const { data } = await response.json();
  return data?.events || [];
}

const generateRSSFeed = (events: Event[]) => {
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

  events.forEach((event: Event) => {
    const categories: Category[] = [];
event.tags.forEach((tag) => {
  categories.push({ name: tag, domain: 'Willamette-events' }); // Add the tag as a Category object
});
    feed.addItem({
      title: event.title,
      id: `http://localhost:3000/events/${event.id}`,
      link: `http://localhost:3000/events/${event.id}`,
      description: event.description,
      content: event.content,
      author: [{ name: event.author }],
      published: new Date(event.date),
      date: new Date(event.date),
      category: categories
    })
  })
  return feed.rss2(); // Generates the RSS XML
};

export async function GET(req: NextRequest) {
  try {
    // Read request headers for caching
    const ifModifiedSince = req.headers.get('if-modified-since')
    const ifNoneMatch = req.headers.get('if-none-match');
    const modifiedSinceDate = ifModifiedSince ? new Date(ifModifiedSince).toISOString() : undefined

    const { searchParams } = new URL(req.url)
    const tagsParam = searchParams.get('tags')
    const tags = tagsParam ? tagsParam.split(',') : undefined

    const events = await fetchEvents(modifiedSinceDate, tags)

    const rssContent = generateRSSFeed(events);

    // Calculate ETag and Last-Modified headers
    const lastModified = events.length
      ? new Date(Math.max(...events.map(event => new Date(event.date).getTime()))).toUTCString()
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
    return new NextResponse(
      JSON.stringify(error),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
export async function GETz(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const tags = searchParams.get('tags')?.split(',') || null

    // Define the GraphQL query
    const query = `
      query GetEvents($tags: [String!]) {
        events(tags: $tags) {
          id
          title
          description
          content
          author
          date
        }
      }
    `

    // Fetch events from the GraphQL endpoint
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { tags },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const { data } = await response.json()

    if (!data?.events) {
      throw new Error('No events found in the GraphQL response.')
    }

    const eventsData = data.events

    // Create the RSS feed
    const feed = new Feed({
      title: 'My RSS Feed',
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

    // Add events to the feed
    eventsData.forEach((event: Event) => {
      feed.addItem({
        title: event.title,
        id: `http://localhost:3000/events/${event.id}`,
        link: `http://localhost:3000/events/${event.id}`,
        description: event.description,
        content: event.content,
        author: [{ name: event.author }],
        date: new Date(event.date),
      })
    })

    // Return the RSS feed
    return new NextResponse(feed.rss2(), {
      headers: { 'Content-Type': 'application/rss+xml' },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 })
  }
}
