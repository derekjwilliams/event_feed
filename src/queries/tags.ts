import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchTags } from '@/queryFunctions/tags'
import { Query_Root } from '@/types/graphql'

const useTagsQuery = (): UseQueryResult<Query_Root['tagsConnection']> => {
  const queryResult = useQuery({
    queryKey: ['tagsConnection'],
    queryFn: fetchTags,
  })

  return queryResult
}

export default useTagsQuery
