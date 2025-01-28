import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchEventsWithPagination } from '@/queryFunctions/events'
import { EventsConnection } from '@/types/graphql'

interface EventsQueryParams {
  pubDate: string
  tagNames: string[]
  pagination: {
    after?: string
    before?: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

const useEventsQuery = ({
  pubDate,
  tagNames,
  pagination,
}: EventsQueryParams): UseQueryResult<EventsConnection> => {
  const queryResult = useQuery({
    queryKey: ['events', { pubDate, tagNames, ...pagination }],
    queryFn: () =>
      fetchEventsWithPagination({
        pubDate,
        tagNames,
        first: !pagination.before ? 20 : undefined,
        after: pagination.after,
        last: pagination.before ? 20 : undefined,
        before: pagination.before,
      }),
    placeholderData: (previous) => previous,
    retry: 2,
    retryDelay: 1000,
  })

  return queryResult
}

export default useEventsQuery
