import { NextResponse } from 'next/server'
import { and, gt, lt, inArray, eq, sql, exists } from 'drizzle-orm'
import { events, tags, eventTags } from '@/db/generated_schema'
import { db } from '@/utils/db'
import { EventWithTags } from '@/app/events/eventTypes'

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tagNames = searchParams.getAll('tags')
  const after = searchParams.get('after') // New parameter for forward pagination
  const before = searchParams.get('before') // New parameter for backward pagination
  const limit = Number(searchParams.get('limit')) || 100

  let query
  let cursorFilter

  if (after) {
    const decodedCursor = decodeCursor(after)
    if (decodedCursor) {
      cursorFilter = and(
        gt(events.eventStartDate, decodedCursor.eventStartDate),
        gt(events.id, decodedCursor.id)
      )
    }
  } else if (before) {
    const decodedCursor = decodeCursor(before)
    if (decodedCursor) {
      cursorFilter = and(
        lt(events.eventStartDate, decodedCursor.eventStartDate),
        lt(events.id, decodedCursor.id)
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
          cursorFilter ?? sql`TRUE`,
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
      .orderBy(events.eventStartDate, events.id)
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
      .orderBy(events.eventStartDate, events.id)
      .limit(limit)
  }

  const rawResult: EventWithTags[] = await query

  // ✅ Determine if there are more pages ahead (`has_next`) and generate `next_cursor`
  let hasNext = false
  let nextCursor: string | null = null

  if (rawResult.length === limit) {
    const lastEvent = rawResult[rawResult.length - 1]
    const nextPageCheckQuery = db
      .select()
      .from(events)
      .where(gt(events.id, lastEvent.event.id))
      .limit(1)

    const nextPageCheckResult = await nextPageCheckQuery
    hasNext = nextPageCheckResult.length > 0
    nextCursor = encodeCursor(
      lastEvent.event.eventStartDate!,
      lastEvent.event.id
    )
  }

  let hasPrev = false
  let prevCursor: string | null = null

  if (rawResult.length > 0) {
    const firstEvent = rawResult[0]
    const prevPageCheckQuery = db
      .select()
      .from(events)
      .where(lt(events.id, firstEvent.event.id))
      .limit(1)

    const prevPageCheckResult = await prevPageCheckQuery
    hasPrev = prevPageCheckResult.length > 0
    prevCursor = encodeCursor(
      firstEvent.event.eventStartDate!,
      firstEvent.event.id
    )
  }

  return NextResponse.json(
    {
      data: rawResult.map(({ event, tags }) => ({
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
      })),
      pagination: {
        next_cursor: nextCursor,
        prev_cursor: prevCursor,
        has_next: hasNext,
        has_prev: hasPrev,
      },
    },
    { status: 200 }
  )
}
