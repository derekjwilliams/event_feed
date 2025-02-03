import {
  geometry,
  pgTable,
  check,
  integer,
  varchar,
  index,
  unique,
  serial,
  text,
  timestamp,
  foreignKey,
  primaryKey,
  pgView,
  pgSequence,
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
  ]
)
