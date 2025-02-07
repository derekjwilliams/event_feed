import { NextResponse } from 'next/server'
import { and, gt, lt, inArray, eq, sql, exists, lte } from 'drizzle-orm'
import { events, tags, eventTags } from '@/db/schema'
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
  const first = Number(searchParams.get('first')) || 10 // TODO use a const instead of hardcoding 10000
  const last = Number(searchParams.get('last')) || 10 // TODO use a const instead of hardcoding 10000

  let query
  let cursorFilter

  if (after) {
    // TODO use first here?
    const decodedCursor = decodeCursor(after)
    if (decodedCursor) {
      cursorFilter = and(
        gt(events.eventStartDate, decodedCursor.eventStartDate),
        gt(events.id, decodedCursor.id)
      )
    }
  } else if (before) {
    // TODO use last here?
    const decodedCursor = decodeCursor(before)
    if (decodedCursor) {
      cursorFilter = and(
        lt(events.eventStartDate, decodedCursor.eventStartDate),
        lt(events.id, decodedCursor.id)
      )
    }
  }

  let limit = 10000 // TODO use a const instead of hardcoding 10000
  if (after && !before) {
    limit = first
  } else if (!after && before) {
    limit = last
  } else if (first) {
    limit = first
  } else if (last) {
    limit = last
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

  let hasNext = false
  let endCursor: string | null = null

  if (rawResult.length === limit) {
    const lastEvent = rawResult[rawResult.length - 1]
    const nextPageCheckQuery = db
      .select()
      .from(events)
      .where(
        and(
          gt(sql`(${events.id})`, sql`(${lastEvent.event.id})`),
          tagNames.length > 0
            ? exists(
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
            : sql`TRUE`
        )
      )
      .limit(1)

    const nextPageCheckResult = await nextPageCheckQuery
    hasNext = nextPageCheckResult.length > 0
    endCursor = encodeCursor(
      lastEvent.event.eventStartDate!,
      lastEvent.event.id
    )
  }

  let hasPrev = false
  let startCursor: string | null = null

  if (rawResult.length > 0) {
    const firstEvent = rawResult[0]
    const prevPageCheckQuery = db
      .select()
      .from(events)
      .where(
        and(
          lt(events.id, firstEvent.event.id),
          lt(
            sql`(${events.eventStartDate})::timestamptz`,
            sql`(${firstEvent.event.eventStartDate})::timestamptz`
          ),
          tagNames.length > 0
            ? exists(
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
            : sql`TRUE`
        )
      )
      .limit(1)

    const prevPageCheckResult = await prevPageCheckQuery
    hasPrev = prevPageCheckResult.length > 0
    startCursor = encodeCursor(
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
      pageInfo: {
        endCursor: endCursor,
        startCursor: startCursor,
        hasNextPage: hasNext,
        hasPreviousPage: hasPrev,
      },
    },
    { status: 200 }
  )
}
