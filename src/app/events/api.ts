export async function fetchEventsWithTags(
  tagNames: string[] = [],
  cursor: string | null = null,
  limit: number = 10,
  direction: 'next' | 'previous' = 'next'
) {
  const response = await fetch('/api/get-events', {
    method: 'POST',
    body: JSON.stringify({ tagNames, cursor, limit, direction }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
}
