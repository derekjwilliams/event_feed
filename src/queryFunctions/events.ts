import { EVENTS_QUERY } from '@/graphql_queries/queries'
import { FetchEventsVariables } from '@/app/hooks/params'
import { EventsConnection } from '@/types/graphql'

export async function fetchEventsWithPagination(
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
      variables: { pubDate, tagNames },
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
