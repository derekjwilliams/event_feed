import { relations } from 'drizzle-orm/relations'
import { events, eventTags, tags } from './schema'

export const eventTagsRelations = relations(eventTags, ({ one }) => ({
  event: one(events, {
    fields: [eventTags.eventId],
    references: [events.id],
  }),
  tag: one(tags, {
    fields: [eventTags.tagId],
    references: [tags.id],
  }),
}))

export const eventsRelations = relations(events, ({ many }) => ({
  eventTags: many(eventTags),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  eventTags: many(eventTags),
}))
