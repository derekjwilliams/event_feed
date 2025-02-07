import { useQuery } from '@tanstack/react-query'
import { EventsQueryParams } from './params'
const maxNumberToRetrieve = `${10}` // TODO

//: UseQueryResult<EventsConnection>
const useEventsQuery = ({
  pubDate,
  tagNames,
  pagination,
}: EventsQueryParams) => {
  return useQuery({
    queryKey: [
      'events',
      { pubDate, tagNames, after: pagination.after, before: pagination.before },
    ],
    queryFn: async () => {
      const params = new URLSearchParams() ////
      params.set('pubDate', pubDate)
      tagNames.forEach((tag) => params.append('tags', tag))
      if (pagination.after) {
        params.set(
          'first',
          `${pagination.first}` ? `${pagination.first}` : maxNumberToRetrieve
        )
        params.set('after', pagination.after)
      }
      if (pagination.before) {
        params.set(
          'last',
          `${pagination.last}` ? `${pagination.last}` : maxNumberToRetrieve
        )
        params.set('before', pagination.before)
      }

      const res = await fetch(`/api/events?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch events')
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 15 * 60 * 1000, // Garbage collection after 15 minutes
    // keepPreviousData: true, // Avoids flickering when paginating
  })
}

export default useEventsQuery
