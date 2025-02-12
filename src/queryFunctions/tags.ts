import { TAGS_QUERY } from '@/graphql_queries/queries'
import { Query_Root } from '@/types/graphql'

export async function fetchTags(): Promise<Query_Root['tagsConnection']> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'https://vital-aphid-95.hasura.app/v1beta1/relay',
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
  const { data, errors }: { data: Query_Root; errors?: { message: string }[] } =
    await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.tagsConnection || null
}
