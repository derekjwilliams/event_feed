import 'dotenv/config'
import { and, gt, inArray, eq, sql, exists } from 'drizzle-orm'
import { events, tags, eventTags } from '@/db/generated_schema'
import { db } from '@/utils/db'
export async function getEventsWithTags(date: string, tagNames: string[]) {
  let result
  if (tagNames.length > 0) {
    result = await db
      .select({
        event: events,
        tags: sql<string[]>`array_agg(${tags.name})`,
      })
      .from(events)
      .innerJoin(eventTags, eq(events.id, eventTags.eventId))
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(
        and(
          gt(events.pubDate, date),
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
  } else {
    result = await db
      .select({
        event: events,
        tags: sql<string[]>`array_agg(${tags.name})`,
      })
      .from(events)
      .innerJoin(eventTags, eq(events.id, eventTags.eventId))
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(gt(events.pubDate, date))
      .groupBy(events.id)
  }
  console.log('Events with tags:', result.length)

  return result
}
