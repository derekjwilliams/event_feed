// Types for the GraphQL schema
export type Event = {
  id: number
  title: string
  description?: string | null
  content?: string | null
  link?: string | null
  author?: string | null
  pubDate?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  imageUrl?: string | null
  location?: string | null
  eventEndDate?: string | null
  eventStartDate?: string | null
  tags?: Tag[] | null
}

export type Tag = {
  id: number
  name: string
  events?: Event[] | null
}

export type EventTag = {
  eventId: number
  tagId: number
}

// Input types for mutations
export type CreateEventInput = {
  title: string
  description?: string | null
  content?: string | null
  link?: string | null
  author?: string | null
  pubDate?: string | null
  imageUrl?: string | null
  location?: string | null
  eventEndDate?: string | null
  eventStartDate?: string | null
  tagIds?: number[] | null
}

export type UpdateEventInput = {
  id: number
  title?: string | null
  description?: string | null
  content?: string | null
  link?: string | null
  author?: string | null
  pubDate?: string | null
  imageUrl?: string | null
  location?: string | null
  eventEndDate?: string | null
  eventStartDate?: string | null
  tagIds?: number[] | null
}

export type CreateTagInput = {
  name: string
}

export type UpdateTagInput = {
  id: number
  name: string
}

// Context type for AppSync
export type AppSyncContext = {
  arguments: Record<string, any>
  identity?: any
  source?: any
  result?: any
  prev?: any
  info?: {
    fieldName: string
    parentTypeName: string
    variables: Record<string, any>
    selectionSetList: string[]
    selectionSetGraphQL: string
  }
  stash?: Record<string, any>
}
