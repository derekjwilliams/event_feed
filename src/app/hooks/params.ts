import { LargeNumberLike } from 'crypto'

export interface EventsQueryParams {
  pubDate: string
  tagNames: string[]
  pagination: {
    after?: string
    before?: string
    first?: number
    last?: number
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
