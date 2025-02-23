import { EVENTS_QUERY } from '@/graphql_queries/queries'
import { FetchEventsVariables } from '@/queries/params'
import { EventsConnection } from '@/types/graphql'

export async function fetchEventsWithPagination(
  variables: FetchEventsVariables
): Promise<EventsConnection> {
  const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || ''
  if (graphqlEndpoint === '') {
    throw new Error(
      `No NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`
    )
  }

  const response = await fetch(graphqlEndpoint, {
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
  })

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  const { data, errors } = await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.getEventsByDateAndTags || []
}
// TODO USE NEXT_PUBLIC_GRAPHQL_ENDPOINT?
export async function fetchEvents(
  pubDate?: string,
  tagNames: string[] = []
): Promise<EventsConnection> {
  const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || ''
  if (graphqlEndpoint === '') {
    throw new Error(
      `No NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`
    )
  }
  if (!pubDate) {
    pubDate = new Date(0).toISOString() //'1970-01-01T00:00:00+00:00, for returning all events
  }

  const response = await fetch(graphqlEndpoint, {
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
      `Failed to get events from graphql server at ${graphqlEndpoint}: ${response.statusText}. Query: ${EVENTS_QUERY}`
    )
  }
  const { data } = await response.json()
  return data?.getEventsByDateAndTags || []
}
