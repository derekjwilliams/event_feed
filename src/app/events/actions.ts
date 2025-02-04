'use server'
import { and, gt, inArray, eq, sql, exists, lt, lte } from 'drizzle-orm'
import { events, tags, eventTags } from '@/db/generated_schema'
import { db } from '@/utils/db'
import { EventWithTags, Tag } from '@/app/events/eventTypes'
import { cache } from 'react'

function encodeCursor(eventStartDate: string, id: number): string {
  return Buffer.from(`${eventStartDate}|${id}`).toString('base64')
}

function decodeCursor(
  cursor: string
): { eventStartDate: string; id: number } | null {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8')
    const [eventStartDate, id] = decoded.split('|')
    return { eventStartDate, id: parseInt(id, 10) }
  } catch {
    return null
  }
}

export async function getEventsWithTags(
  tagNames: string[] = [],
  cursor: string | null = null,
  limit: number = 10, // Default page size
  direction: 'next' | 'previous' = 'next'
): Promise<{
  result: EventWithTags[]
  nextCursor: string | null
  hasMore: boolean
}> {
  let query
  let cursorFilter
  if (cursor) {
    const decodedCursor = decodeCursor(cursor)
    if (decodedCursor) {
      cursorFilter = and(
        direction === 'next'
          ? gt(events.eventStartDate, decodedCursor.eventStartDate)
          : lte(events.eventStartDate, decodedCursor.eventStartDate),
        direction === 'next'
          ? gt(events.id, decodedCursor.id)
          : lte(events.id, decodedCursor.id)
      )
    }
  }

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
          cursorFilter ?? sql`TRUE`, // Apply cursor filter if present
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
      .orderBy(events.eventStartDate, events.id) // Order by both timestamp and ID
      .limit(limit)
  } else {
    query = db
      .select({
        event: events,
        tags: sql<string[]>`array_agg(${tags.name})`,
      })
      .from(events)
      .innerJoin(eventTags, eq(events.id, eventTags.eventId))
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(cursorFilter ?? sql`TRUE`)
      .groupBy(events.id)
      .orderBy(events.eventStartDate, events.id) // Order by both timestamp and ID
      .limit(limit)
  }

  const rawResult: EventWithTags[] = await query

  let hasMore = false
  if (rawResult.length === limit) {
    // Check if there are more records after the last event
    const lastEvent = rawResult[rawResult.length - 1]
    const nextPageCheckQuery = db
      .select()
      .from(events)
      .where(gt(events.id, lastEvent.event.id))
      .limit(1) // Only check for one record

    const nextPageCheckResult = await nextPageCheckQuery
    hasMore = nextPageCheckResult.length > 0
  }

  // Convert timestamps to ISO format and generate the new cursor
  const result = rawResult.map(({ event, tags }) => ({
    event: {
      ...event,
      eventStartDate: event.eventStartDate
        ? new Date(event.eventStartDate).toISOString()
        : null,
      pubDate: event.pubDate ? new Date(event.pubDate).toISOString() : null,
      createdAt: event.createdAt
        ? new Date(event.createdAt).toISOString()
        : null,
      updatedAt: event.updatedAt
        ? new Date(event.updatedAt).toISOString()
        : null,
    },
    tags,
  }))

  const nextCursor =
    result.length > 0
      ? encodeCursor(
          result[result.length - 1].event.eventStartDate!,
          result[result.length - 1].event.id
        )
      : null

  return { result, nextCursor, hasMore }
}

export async function getAllTags(): Promise<Tag[]> {
  return await db.select().from(tags).orderBy(tags.name)
}
