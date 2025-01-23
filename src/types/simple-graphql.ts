interface Tag {
  id: number
  name: string
}

interface EventTag {
  eventId: number
  nodeId: string
  tagId: number
  tagByTagId?: Tag
}
interface EventTagsConnection {
  nodes: Array<EventTag>
}
interface Event {
  id: number
  author?: string
  title?: string
  description?: string
  content?: string
  link?: string
  pubDate?: string
  nodeId: string
  createdAt?: string
  updatedAt?: string
  eventTagsByEventId: EventTagsConnection
}

export type EventsConnection = {
  nodes: Array<Event>
  totalCount: number
}
