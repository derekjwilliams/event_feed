import { TAGS_QUERY } from '@/graphql_queries/queries'
import { Query, TagsConnection } from '@/types/graphql'

export async function fetchTags(): Promise<TagsConnection | null> {
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
      query: TAGS_QUERY,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  const { data, errors }: { data: Query; errors?: { message: string }[] } =
    await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.allTags || null
}
