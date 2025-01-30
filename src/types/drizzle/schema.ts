import {
  pgTable,
  index,
  unique,
  pgPolicy,
  serial,
  varchar,
  text,
  timestamp,
  foreignKey,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const tags = pgTable(
  'tags',
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    index('idx_tags_name').using(
      'btree',
      table.name.asc().nullsLast().op('text_ops')
    ),
    unique('tags_name_key').on(table.name),
    pgPolicy('Allow authenticated delete on tags', {
      as: 'permissive',
      for: 'delete',
      to: ['public'],
      using: sql`(auth.role() = 'authenticated'::text)`,
    }),
    pgPolicy('Allow authenticated update on tags', {
      as: 'permissive',
      for: 'update',
      to: ['public'],
    }),
    pgPolicy('Allow authenticated insert on tags', {
      as: 'permissive',
      for: 'insert',
      to: ['public'],
    }),
    pgPolicy('Allow public read on tags', {
      as: 'permissive',
      for: 'select',
      to: ['public'],
    }),
  ]
)

export const events = pgTable('events', {
  id: serial().primaryKey().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  content: text(),
  link: text(),
  author: text(),
  pubDate: timestamp('pub_date', { withTimezone: true, mode: 'string' }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`CURRENT_TIMESTAMP`),
})

export const eventTags = pgTable(
  'event_tags',
  {
    eventId: integer('event_id').notNull(),
    tagId: integer('tag_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.eventId],
      foreignColumns: [events.id],
      name: 'event_tags_event_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tags.id],
      name: 'event_tags_tag_id_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.eventId, table.tagId],
      name: 'event_tags_pkey',
    }),
    pgPolicy('Allow authenticated delete on event_tags', {
      as: 'permissive',
      for: 'delete',
      to: ['public'],
      using: sql`(auth.role() = 'authenticated'::text)`,
    }),
    pgPolicy('Allow authenticated update on event_tags', {
      as: 'permissive',
      for: 'update',
      to: ['public'],
    }),
    pgPolicy('Allow authenticated insert on event_tags', {
      as: 'permissive',
      for: 'insert',
      to: ['public'],
    }),
    pgPolicy('Allow public read on event_tags', {
      as: 'permissive',
      for: 'select',
      to: ['public'],
    }),
  ]
)
