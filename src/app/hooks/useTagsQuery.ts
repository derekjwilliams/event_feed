import { useQuery } from '@tanstack/react-query'

export function useTagsQuery() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await fetch('/api/tags')
      if (!res.ok) throw new Error('Failed to fetch tags')
      return res.json()
    },
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
    gcTime: 2 * 60 * 60 * 1000, // Garbage collection after 2 hours
  })
}
