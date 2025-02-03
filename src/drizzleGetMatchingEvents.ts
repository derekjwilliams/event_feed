import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { and, gt, inArray, eq, sql, exists } from 'drizzle-orm'

import { events, tags, eventTags } from './db/generated_schema'
import * as schema from './db/generated_schema'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const db = drizzle(pool, { schema })
interface EventWithTags {
  eventId: number
  eventTitle: string
  eventDate: string
  tags: string[]
}

async function main() {
  const eventList = await db.select().from(events)
  console.log('Getting all events from the database: ', eventList)
}
async function getEventsWithTags(date: string, tagNames: string[]) {
  // Get events after the specified date and with matching tags, collecting tags in an array
  const result = await db
    .select({
      event: events,
      tags: sql<string[]>`array_agg(${tags.name})`,
    })
    .from(events)
    .innerJoin(eventTags, eq(events.id, eventTags.eventId))
    .innerJoin(tags, eq(eventTags.tagId, tags.id))
    .where(
      and(
        gt(events.eventStartDate, date),
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

  console.log('Events with tags:', result)
}

// getEventsWithTags('2025-02-01', ['conference', 'workshop'])

getEventsWithTags('2021-02-01', ['Alpha Chi Omega', 'Baxter Hall'])
