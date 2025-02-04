import { useQuery } from '@tanstack/react-query'
const pageSize = `${100}`
export function useEventsQuery({
  pubDate,
  tagNames,
  pagination,
}: {
  pubDate: string
  tagNames: string[]
  pagination: { after?: string; before?: string }
}) {
  return useQuery({
    queryKey: [
      'events',
      tagNames,
      pagination.after,
      pagination.before,
      pubDate,
    ],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set('limit', pageSize)
      params.set('pubDate', pubDate)
      tagNames.forEach((tag) => params.append('tags', tag))
      if (pagination.after) params.set('after', pagination.after)
      if (pagination.before) params.set('before', pagination.before)

      const res = await fetch(`/api/events?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch events')
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 15 * 60 * 1000, // Garbage collection after 15 minutes
    // keepPreviousData: true, // Avoids flickering when paginating
  })
}
