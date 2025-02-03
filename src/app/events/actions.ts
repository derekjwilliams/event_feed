'use server'
import { and, gt, inArray, eq, sql, exists } from 'drizzle-orm'
import { events, tags, eventTags } from '@/db/generated_schema'
import { db } from '@/utils/db'
import { EventWithTags, Tag } from '@/app/events/eventTypes'

export async function getEventsWithTags(
  tagNames: string[] = [],
  cursor: string = new Date(0).toISOString(),
  limit: number = 2 //TODO limit
): Promise<{ result: EventWithTags[]; nextCursor: string | null }> {
  let query
  if (tagNames.length > 0) {
    query = db
      .select({
        event: events,
        tags: sql<string[]>`array_agg(${tags.name})`,
      })
      .from(events)
      .innerJoin(eventTags, eq(events.id, eventTags.eventId))
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(
        and(
          gt(events.pubDate, cursor),
          exists(
            db
              .select()
              .from(eventTags)
              .innerJoin(tags, eq(eventTags.tagId, tags.id))
              .where(
                and(
                  eq(eventTags.eventId, events.id),
                  inArray(tags.name, tagNames)
                )
              )
          )
        )
      )
      .groupBy(events.id)
      .orderBy(events.eventStartDate)
      .limit(2) //TODO limit
  } else {
    query = db
      .select({
        event: events,
        tags: sql<string[]>`array_agg(${tags.name})`,
      })
      .from(events)
      .innerJoin(eventTags, eq(events.id, eventTags.eventId))
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(gt(events.eventStartDate, cursor))
      .groupBy(events.id)
      .orderBy(events.eventStartDate)
      .limit(2) //TODO limit
  }

  const result: EventWithTags[] = await query
  const nextCursor =
    result.length > 0 ? result[result.length - 1].event.eventStartDate : null
  return { result, nextCursor }
}

export async function getAllTags(): Promise<Tag[]> {
  return await db.select().from(tags).orderBy(tags.name)
}
