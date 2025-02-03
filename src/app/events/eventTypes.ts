import { InferSelectModel } from 'drizzle-orm'
import { events, tags } from '@/db/generated_schema'
type Event = InferSelectModel<typeof events>

export interface EventWithTags {
  event: Event
  tags: string[] // Array of tag names
}

export type Tag = InferSelectModel<typeof tags>
