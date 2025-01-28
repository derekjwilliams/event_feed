import { EVENTS_QUERY } from '@/graphql_queries/queries'
import { EventsConnection } from '@/types/graphql'

interface FetchEventsVariables {
  pubDate: string
  tagNames: string[]
  first?: number
  after?: string
  last?: number
  before?: string
}

export async function fetchEvents(
  variables: FetchEventsVariables
): Promise<EventsConnection> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'https://event-graphql.vercel.app/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: {
          pubDate: variables.pubDate,
          tagNames: variables.tagNames,
          first: variables.first,
          after: variables.after,
          last: variables.last,
          before: variables.before,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  const { data, errors } = await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.getEventsByDateAndTags || []
}
