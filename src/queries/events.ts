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
  const queryResult = useQuery({
    queryKey: [
      'events',
      {
        pubDate,
        tagNames,
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
