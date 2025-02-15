import { EVENTS_QUERY } from '@/graphql_queries/queries'
import { FetchEventsVariables } from '@/queries/params'
import { EventsConnection } from '@/types/graphql'

function convertToHasuraTagString(tags: string[]): string {
  return `{${tags
    .map((tag) => {
      // Escape double quotes by doubling them (Postgres rule)
      const escapedTag = tag.replace(/"/g, '""')

      // Add quotes around tags containing commas, spaces, or special characters
      if (
        tag.includes(',') ||
        tag.includes(' ') ||
        tag.includes('"') ||
        tag.includes('\\')
      ) {
        return `"${escapedTag}"`
      }
      return escapedTag
    })
    .join(',')}}`
}

export async function fetchEventsWithPagination(
  variables: FetchEventsVariables
): Promise<EventsConnection> {
  const hasuraCompatibleTags: string = convertToHasuraTagString(
    variables.tagNames
  )
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'https://vital-aphid-95.hasura.app/v1beta1/relay',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: {
          pubDate: variables.pubDate,
          tagNames: hasuraCompatibleTags,
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

  return data?.getEventsByDateAndTags_connection || []
}

export async function fetchEvents(
  pubDate?: string,
  tagNames: string[] = []
): Promise<EventsConnection> {
  const hasuraCompatibleTags: string = convertToHasuraTagString(tagNames)
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || ''
  if (GRAPHQL_ENDPOINT === '') {
    throw new Error(
      `No GRAPHQL_ENDPOINT environment variable not found, check configuration. For example .env for running locally, or Vercel Environment Variables for the project`
    )
  }
  if (!pubDate) {
    pubDate = '1970-01-01T00:00:00+00:00'
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
      variables: { pubDate, hasuraCompatibleTags },
    }),
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(
      `Failed to get events from graphql server at ${GRAPHQL_ENDPOINT}: ${response.statusText}. Query: ${EVENTS_QUERY}`
    )
  }
  const { data } = await response.json()

  return data?.getEventsByDateAndTags_connection || []
}
