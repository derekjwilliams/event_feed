import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchEventsWithPagination } from '@/queryFunctions/events'
import { EventsConnection } from '@/types/graphql'
import { EventsQueryParams } from './params'

const useEventsQuery = ({
  pubDate,
  tagNames,
  pagination,
}: EventsQueryParams): UseQueryResult<EventsConnection> => {
  if (tagNames.length === 1 && tagNames[0] === '') {
    //handle case with 1 empty string
    tagNames = []
  }
  const queryResult = useQuery({
    queryKey: [
      'events',
      { pubDate, tagNames, after: pagination.after, before: pagination.before },
    ],
    queryFn: () =>
      fetchEventsWithPagination({
        pubDate,
        tagNames,
        first: !pagination.before ? 10 : undefined,
        after: pagination.after,
        last: pagination.before ? 10 : undefined,
        before: pagination.before,
      }),
    placeholderData: (previous) => previous,
    retry: 2,
    retryDelay: 1000,
  })
  return queryResult
}

export default useEventsQuery
