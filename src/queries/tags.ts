import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchTags } from '@/queryFunctions/tags'
import { Query } from '@/types/graphql'

const useTagsQuery = (): UseQueryResult<Query['allTags']> => {
  const queryResult = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })
  return queryResult
}

export default useTagsQuery
