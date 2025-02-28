/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppSyncContext,
  CreateTagInput,
  UpdateTagInput,
  Tag,
} from '../types/types'
import { Buffer } from 'buffer'
/**
 * Get a tag by ID
 */
export function getTagRequest(ctx: AppSyncContext) {
  const { id } = ctx.arguments
  return {
    operation: 'PreparedStatement',
    sql: 'SELECT * FROM tags WHERE id = $1',
    parameters: [id],
  }
}

export function getTagResponse(ctx: AppSyncContext): Tag | null {
  return ctx.result?.length > 0 ? mapTagFromDatabase(ctx.result[0]) : null
}

/**
 * List all tags
 */
export function listTagsRequest(ctx: AppSyncContext) {
  const { limit = 100, nextToken } = ctx.arguments

  let sql = 'SELECT * FROM tags ORDER BY name'
  const parameters = []

  // Add limit
  sql += ' LIMIT $1'
  parameters.push(limit)

  // Add offset for pagination if nextToken is provided
  if (nextToken) {
    const offset = parseInt(Buffer.from(nextToken, 'base64').toString('ascii'))
    sql += ' OFFSET $2'
    parameters.push(offset)
  }

  return {
    operation: 'PreparedStatement',
    sql,
    parameters,
  }
}

export function listTagsResponse(ctx: AppSyncContext): {
  items: Tag[]
  nextToken: string | null
} {
  const tags = ctx.result?.map(mapTagFromDatabase) || []
  const { limit = 100 } = ctx.arguments

  // Create nextToken for pagination if we have results equal to the limit
  let nextToken = null
  if (tags.length === limit) {
    const offset =
      (ctx.arguments.nextToken
        ? parseInt(
            Buffer.from(ctx.arguments.nextToken, 'base64').toString('ascii')
          )
        : 0) + limit
    nextToken = Buffer.from(offset.toString()).toString('base64')
  }

  return {
    items: tags,
    nextToken,
  }
}

/**
 * Create a new tag
 */
export function createTagRequest(ctx: AppSyncContext) {
  const input: CreateTagInput = ctx.arguments.input

  return {
    operation: 'PreparedStatement',
    sql: 'INSERT INTO tags (name) VALUES ($1) RETURNING *',
    parameters: [input.name],
  }
}

export function createTagResponse(ctx: AppSyncContext): Tag | null {
  return ctx.result?.length > 0 ? mapTagFromDatabase(ctx.result[0]) : null
}

/**
 * Update an existing tag
 */
export function updateTagRequest(ctx: AppSyncContext) {
  const input: UpdateTagInput = ctx.arguments.input

  return {
    operation: 'PreparedStatement',
    sql: 'UPDATE tags SET name = $2 WHERE id = $1 RETURNING *',
    parameters: [input.id, input.name],
  }
}

export function updateTagResponse(ctx: AppSyncContext): Tag | null {
  return ctx.result?.length > 0 ? mapTagFromDatabase(ctx.result[0]) : null
}

/**
 * Delete a tag
 */
export function deleteTagRequest(ctx: AppSyncContext) {
  const { id } = ctx.arguments

  return {
    operation: 'PreparedStatement',
    sql: 'DELETE FROM tags WHERE id = $1 RETURNING *',
    parameters: [id],
  }
}

export function deleteTagResponse(ctx: AppSyncContext): Tag | null {
  return ctx.result?.length > 0 ? mapTagFromDatabase(ctx.result[0]) : null
}

/**
 * Get events for a tag
 */
export function tagEventsRequest(ctx: AppSyncContext) {
  const { source } = ctx

  return {
    operation: 'PreparedStatement',
    sql: `
      SELECT e.* 
      FROM events e
      JOIN event_tags et ON e.id = et.event_id
      WHERE et.tag_id = $1
      ORDER BY e.event_start_date
    `,
    parameters: [source.id],
  }
}

export function tagEventsResponse(ctx: AppSyncContext) {
  return (
    ctx.result?.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      content: event.content,
      link: event.link,
      author: event.author,
      pubDate: event.pub_date,
      createdAt: event.created_at,
      updatedAt: event.updated_at,
      imageUrl: event.image_url,
      location: event.location,
      eventEndDate: event.event_end_date,
      eventStartDate: event.event_start_date,
    })) || []
  )
}

/**
 * Helper function to map database column names to camelCase for GraphQL
 */
function mapTagFromDatabase(item: any): Tag {
  return {
    id: item.id,
    name: item.name,
  }
}
