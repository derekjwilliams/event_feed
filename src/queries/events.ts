import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchEventsWithPagination } from '@/queryFunctions/events'
import { EventsConnection } from '@/types/graphql'
import { EventsQueryParams } from './params'

const useEventsQuery = ({
  pubDate,
  tagNames,
  pagination,
  pageSize,
}: EventsQueryParams): UseQueryResult<EventsConnection> => {
  // handle edge cases
  if (pagination.last && pagination.first) {
    pagination.last = undefined
  }
  if (pagination.after && pagination.before) {
    if (pagination.last) {
      pagination.after = undefined
    } else if (pagination.first) {
      pagination.before = undefined
    } else {
      pagination.before = undefined
    }
  }
  const queryResult = useQuery({
    queryKey: [
      'events',
      {
        pubDate,
        tagNames,
        first: pagination.first,
        last: pagination.last,
        after: pagination.after,
        before: pagination.before,
        pageSize,
      },
    ],
    queryFn: () =>
      fetchEventsWithPagination({
        pubDate,
        tagNames,
        first: !pagination.before ? pageSize : undefined,
        after: pagination.after,
        last: pagination.before ? pageSize : undefined,
        before: pagination.before,
      }),
    placeholderData: (previous) => previous,
    retry: 2,
    retryDelay: 1000,
  })

  return queryResult
}

export default useEventsQuery
