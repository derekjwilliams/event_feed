import { NextRequest, NextResponse } from 'next/server'
import { Feed } from 'feed'

const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql'

interface Event {
  id: string
  title: string
  description: string
  content: string
  author: string
  date: Date
}

export async function GET(req: NextRequest) {
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

    console.log('data: ', data)

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
    console.error('Error generating RSS feed:', error);
    return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 })
  }
}
