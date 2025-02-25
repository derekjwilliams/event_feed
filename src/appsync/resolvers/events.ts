/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppSyncContext,
  CreateEventInput,
  UpdateEventInput,
  Event,
  EventTag,
} from './types'
import { util } from '@aws-appsync/utils'

/**
 * Get an event by ID
 */
export function getEventRequest(ctx: AppSyncContext) {
  const { id } = ctx.arguments
  return {
    operation: 'PreparedStatement',
    sql: 'SELECT * FROM events WHERE id = $1',
    parameters: [id],
  }
}

export function getEventResponse(ctx: AppSyncContext): Event | null {
  return ctx.result?.length > 0 ? mapEventFromDatabase(ctx.result[0]) : null
}

/**
 * List all events with optional filtering
 */
export function listEventsRequest(ctx: AppSyncContext) {
  const { limit = 50, nextToken, filter } = ctx.arguments

  let sql = 'SELECT * FROM events'
  const parameters = []
  let paramIndex = 1

  // Add filters if provided
  if (filter) {
    const whereClauses = []

    if (filter.title) {
      whereClauses.push(`title ILIKE $${paramIndex}`)
      parameters.push(`%${filter.title}%`)
      paramIndex++
    }

    if (filter.startDateFrom) {
      whereClauses.push(`event_start_date >= $${paramIndex}`)
      parameters.push(filter.startDateFrom)
      paramIndex++
    }

    if (filter.startDateTo) {
      whereClauses.push(`event_start_date <= $${paramIndex}`)
      parameters.push(filter.startDateTo)
      paramIndex++
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ')
    }
  }

  // Add order by and limit
  sql += ' ORDER BY event_start_date ASC LIMIT $' + paramIndex
  parameters.push(limit)

  // Add offset for pagination if nextToken is provided
  if (nextToken) {
    const offset = parseInt(Buffer.from(nextToken, 'base64').toString('ascii'))
    sql += ' OFFSET $' + (paramIndex + 1)
    parameters.push(offset)
  }

  return {
    operation: 'PreparedStatement',
    sql,
    parameters,
  }
}

export function listEventsResponse(ctx: AppSyncContext): {
  items: Event[]
  nextToken: string | null
} {
  const events = ctx.result?.map(mapEventFromDatabase) || []
  const { limit = 50 } = ctx.arguments

  // Create nextToken for pagination if we have results equal to the limit
  let nextToken = null
  if (events.length === limit) {
    const offset =
      (ctx.arguments.nextToken
        ? parseInt(
            Buffer.from(ctx.arguments.nextToken, 'base64').toString('ascii')
          )
        : 0) + limit
    nextToken = Buffer.from(offset.toString()).toString('base64')
  }

  return {
    items: events,
    nextToken,
  }
}

/**
 * Create a new event
 */
export function createEventRequest(ctx: AppSyncContext) {
  const input: CreateEventInput = ctx.arguments.input

  const fields = [
    'title',
    'description',
    'content',
    'link',
    'author',
    'pub_date',
    'image_url',
    'location',
    'event_end_date',
    'event_start_date',
  ]
  const columns = fields.filter((field) => input[camelize(field)] !== undefined)

  const values = columns.map((col, index) => `$${index + 1}`).join(', ')
  const columnsStr = columns.join(', ')

  const parameters = columns.map((col) => {
    const value = input[camelize(col)]
    return value !== null ? value : null
  })

  return {
    operation: 'PreparedStatement',
    sql: `INSERT INTO events (${columnsStr}) VALUES (${values}) RETURNING *`,
    parameters,
  }
}

export function createEventResponse(ctx: AppSyncContext): Event | null {
  // Process the newly created event
  if (!ctx.result || ctx.result.length === 0) {
    return null
  }

  const event = mapEventFromDatabase(ctx.result[0])

  // If tagIds were provided, handle the many-to-many relationship
  const tagIds = ctx.arguments.input.tagIds
  if (tagIds && tagIds.length > 0) {
    // Call function to create event_tags entries
    // In a real implementation, you'd handle this with a transaction
    // or a separate resolver chain
    createEventTagsRequest(event.id, tagIds)
  }

  return event
}

/**
 * Update an existing event
 */
export function updateEventRequest(ctx: AppSyncContext) {
  const input: UpdateEventInput = ctx.arguments.input
  const { id, ...updateFields } = input

  const fields = [
    'title',
    'description',
    'content',
    'link',
    'author',
    'pub_date',
    'image_url',
    'location',
    'event_end_date',
    'event_start_date',
  ]

  // Filter fields that are being updated
  const updateColumns = fields.filter(
    (field) => updateFields[camelize(field)] !== undefined
  )

  // If no fields to update, just return the current event
  if (updateColumns.length === 0) {
    return {
      operation: 'PreparedStatement',
      sql: 'SELECT * FROM events WHERE id = $1',
      parameters: [id],
    }
  }

  // Build SET clause and parameters
  const setClauses = updateColumns.map((col, index) => `${col} = $${index + 2}`)
  const parameters = [
    id,
    ...updateColumns.map((col) => updateFields[camelize(col)]),
  ]

  // Add updated_at
  setClauses.push('updated_at = CURRENT_TIMESTAMP')

  return {
    operation: 'PreparedStatement',
    sql: `UPDATE events SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
    parameters,
  }
}

export function updateEventResponse(ctx: AppSyncContext): Event | null {
  if (!ctx.result || ctx.result.length === 0) {
    return null
  }

  const event = mapEventFromDatabase(ctx.result[0])

  // Handle tag updates if provided
  const tagIds = ctx.arguments.input.tagIds
  if (tagIds !== undefined) {
    // First delete existing tag associations
    deleteEventTagsRequest(event.id)

    // Then create new ones if there are any
    if (tagIds && tagIds.length > 0) {
      createEventTagsRequest(event.id, tagIds)
    }
  }

  return event
}

/**
 * Delete an event
 */
export function deleteEventRequest(ctx: AppSyncContext) {
  const { id } = ctx.arguments

  return {
    operation: 'PreparedStatement',
    sql: 'DELETE FROM events WHERE id = $1 RETURNING *',
    parameters: [id],
  }
}

export function deleteEventResponse(ctx: AppSyncContext): Event | null {
  return ctx.result?.length > 0 ? mapEventFromDatabase(ctx.result[0]) : null
}

/**
 * Helper function to map database column names to camelCase for GraphQL
 */
function mapEventFromDatabase(item: any): Event {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    link: item.link,
    author: item.author,
    pubDate: item.pub_date,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    imageUrl: item.image_url,
    location: item.location,
    eventEndDate: item.event_end_date,
    eventStartDate: item.event_start_date,
  }
}

/**
 * Helper function to convert snake_case to camelCase
 */
function camelize(str: string): string {
  return str.replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}

/**
 * Helper function to create event_tags entries
 */
function createEventTagsRequest(eventId: number, tagIds: number[]) {
  // In a real implementation, this would be a separate resolver or a transaction
  // For demonstration purposes only
  const params = tagIds.flatMap((tagId, index) => [eventId, tagId])

  return {
    operation: 'PreparedStatement',
    sql: `INSERT INTO event_tags (event_id, tag_id) VALUES ${tagIds
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(', ')}`,
    parameters: params,
  }
}

/**
 * Helper function to delete all event_tags entries for an event
 */
function deleteEventTagsRequest(eventId: number) {
  return {
    operation: 'PreparedStatement',
    sql: 'DELETE FROM event_tags WHERE event_id = $1',
    parameters: [eventId],
  }
}

/**
 * Resolver for events by date and tags
 */
export function eventsByDateAndTagsRequest(ctx: AppSyncContext) {
  const { pubDate, tagNames, dateWindowStart, dateWindowEnd } = ctx.arguments

  return {
    operation: 'PreparedStatement',
    sql: 'SELECT * FROM events_by_date_and_tags($1, $2, $3, $4)',
    parameters: [
      pubDate || new Date().toISOString(),
      tagNames || null,
      dateWindowStart || null,
      dateWindowEnd || null,
    ],
  }
}

export function eventsByDateAndTagsResponse(ctx: AppSyncContext): Event[] {
  return ctx.result?.map(mapEventFromDatabase) || []
}

/**
 * Resolver for getting tags for an event
 */
export function eventTagsRequest(ctx: AppSyncContext) {
  const { source } = ctx
  return {
    operation: 'PreparedStatement',
    sql: `
      SELECT t.* 
      FROM tags t
      JOIN event_tags et ON t.id = et.tag_id
      WHERE et.event_id = $1
      ORDER BY t.name
    `,
    parameters: [source.id],
  }
}

export function eventTagsResponse(ctx: AppSyncContext) {
  return (
    ctx.result?.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    })) || []
  )
}
