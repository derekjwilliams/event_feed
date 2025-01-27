export interface User {
  id: string
  name: string
  email: string
}

export interface UsersResponse {
  users: {
    nodes: User[]
    pageInfo: {
      hasNextPage: boolean
      currentPage: number
    }
  }
}

export interface Event {
  id: string
  author: string
  title: string
  description: string
  content: string
  link: string
  pubDate: string
  createdAt: string
  updatedAt: string
  imageUrl: string
  eventStartDate: string
  eventEndDate: string
  eventTagsByEventId: {
    nodes: Array<{
      tagByTagId: {
        name: string
      }
    }>
  }
}

export interface EventsResponse {
  getEventsByDateAndTags: {
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor?: string
      endCursor?: string
    }
    nodes: Event[]
  }
}

export interface Tag {
  name: string
}

export interface TagsResponse {
  allTags: {
    nodes: Tag[]
  }
}
