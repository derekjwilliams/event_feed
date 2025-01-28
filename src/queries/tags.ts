import { TAGS_QUERY } from '@/graphql_queries/queries'
import { TagsConnection } from '@/types/graphql'

export async function fetchTags(): Promise<TagsConnection> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'https://event-graphql.vercel.app/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: TAGS_QUERY,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  const { data, errors } = await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.allTags || []
}
