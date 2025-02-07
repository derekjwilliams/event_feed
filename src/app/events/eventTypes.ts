import { InferSelectModel } from 'drizzle-orm'
import { events, tags } from '@/db/schema'
type Event = InferSelectModel<typeof events>

// TODO add pagination to this interface?
export interface EventWithTags {
  event: Event
  tags: string[] // Array of tag names
}

export type Tag = InferSelectModel<typeof tags>
