import { NextResponse } from 'next/server'

type Event = {
  id: string
  author: string
  title: string
  description: string
  content: string
  link: string
  pubDate: string
  createdAt: string
  updatedAt: string
  imageUrl: string
  eventStartDate: string
  eventEndDate: string
  tags: string[]
}

type GraphQLRequest = {
  query: string
  variables?: {
    pubDate: string
    tagNames: string[]
  }
}

// Generate mock events
const mockEvents: Event[] = Array.from({ length: 50 }, (_, i) => ({
  id: `event-${i + 1}`,
  author: `Author ${(i % 5) + 1}`,
  title: `Event ${i + 1}`,
  description: `Description for event ${i + 1}`,
  content: `Content for event ${i + 1}`,
  link: `https://example.com/event-${i + 1}`,
  pubDate: new Date(Date.now() - i * 86400000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  imageUrl: `https://picsum.photos/200/300?random=${i}`,
  eventStartDate: new Date(Date.now() + i * 3600000).toISOString(),
  eventEndDate: new Date(Date.now() + (i + 2) * 3600000).toISOString(),

  tags:
    i % 2 === 0
      ? ['Housing', 'Willamette', 'PNCA', 'Putnam']
      : ['PNCA', 'Salem', 'Activities'],
}))

export async function POST(request: Request) {
  const { query, variables } = (await request.json()) as GraphQLRequest
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Handle events query
  if (query.includes('getEventsByDateAndTags')) {
    const pubDate = variables?.pubDate || new Date().toISOString()
    const tagNames = variables?.tagNames || []

    // Filter logic
    const filteredEvents = mockEvents.filter((event) => {
      const matchesDate = new Date(event.pubDate) >= new Date(pubDate)
      const matchesTags =
        tagNames.length === 0 ||
        tagNames.every((tag) => event.tags.includes(tag))
      return matchesDate && matchesTags
    })

    return NextResponse.json({
      data: {
        getEventsByDateAndTags: {
          nodes: filteredEvents.map((event) => ({
            ...event,
            eventTagsByEventId: {
              nodes: event.tags.map((tag) => ({
                tagByTagId: { name: tag },
              })),
            },
          })),
        },
      },
    })
  }

  return NextResponse.json(
    { errors: [{ message: 'Unknown query' }] },
    { status: 400 }
  )
}
