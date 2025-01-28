export interface EventsQueryParams {
  pubDate: string
  tagNames: string[]
  pagination: {
    after?: string
    before?: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export interface FetchEventsVariables {
  pubDate: string
  tagNames: string[]
  first?: number
  after?: string
  last?: number
  before?: string
}
