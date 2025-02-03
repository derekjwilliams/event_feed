/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const eventsIdSeq = pgSequence('events_id_seq', {
  startWith: '1',
  increment: '1',
  minValue: '1',
  maxValue: '2147483647',
  cache: '1',
  cycle: false,
})
export const tagsIdSeq = pgSequence('tags_id_seq', {
  startWith: '1',
  increment: '1',
  minValue: '1',
  maxValue: '2147483647',
  cache: '1',
  cycle: false,
})

export const spatialRefSys = pgTable(
  'spatial_ref_sys',
  {
    srid: integer().notNull(),
    authName: varchar('auth_name', { length: 256 }),
    authSrid: integer('auth_srid'),
    srtext: varchar({ length: 2048 }),
    proj4Text: varchar({ length: 2048 }),
  },
  (table) => [
    check('spatial_ref_sys_srid_check', sql`(srid > 0) AND (srid <= 998999)`),
  ]
)

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

//// Temporary for first experiment

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
})

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
  imageUrl: text('image_url'),
  location: text(),
  eventEndDate: timestamp('event_end_date', {
    withTimezone: true,
    mode: 'string',
  }),
  eventStartDate: timestamp('event_start_date', {
    withTimezone: true,
    mode: 'string',
  }),
  // TODO: failed to parse database type 'geography'
  geo_location: geometry('geo_location', {
    type: 'point',
    mode: 'xy',
    srid: 4326,
  }).notNull(),
  baseUrl: text('base_url'),
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
  ]
)
// export const geometryColumns = pgView('geometry_columns', {
//   fTableCatalog: varchar('f_table_catalog', { length: 256 }),
//   // TODO: failed to parse database type 'name'
//   fTableSchema: unknown('f_table_schema'),
//   // TODO: failed to parse database type 'name'
//   fTableName: unknown('f_table_name'),
//   // TODO: failed to parse database type 'name'
//   fGeometryColumn: unknown('f_geometry_column'),
//   coordDimension: integer('coord_dimension'),
//   srid: integer(),
//   type: varchar({ length: 30 }),
// }).as(
//   sql`SELECT current_database()::character varying(256) AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geometry_column, COALESCE(postgis_typmod_dims(a.atttypmod), sn.ndims, 2) AS coord_dimension, COALESCE(NULLIF(postgis_typmod_srid(a.atttypmod), 0), sr.srid, 0) AS srid, replace(replace(COALESCE(NULLIF(upper(postgis_typmod_type(a.atttypmod)), 'GEOMETRY'::text), st.type, 'GEOMETRY'::text), 'ZM'::text, ''::text), 'Z'::text, ''::text)::character varying(30) AS type FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND NOT a.attisdropped JOIN pg_namespace n ON c.relnamespace = n.oid JOIN pg_type t ON a.atttypid = t.oid LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ''''::text, 2), ')'::text, ''::text) AS type FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%geometrytype(% = %'::text) st ON st.connamespace = n.oid AND st.conrelid = c.oid AND (a.attnum = ANY (st.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text)::integer AS ndims FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%ndims(% = %'::text) sn ON sn.connamespace = n.oid AND sn.conrelid = c.oid AND (a.attnum = ANY (sn.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text), '('::text, ''::text)::integer AS srid FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%srid(% = %'::text) sr ON sr.connamespace = n.oid AND sr.conrelid = c.oid AND (a.attnum = ANY (sr.conkey)) WHERE (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT c.relname = 'raster_columns'::name AND t.typname = 'geometry'::name AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`
// )

// export const geographyColumns = pgView('geography_columns', {
//   // TODO: failed to parse database type 'name'
//   fTableCatalog: unknown('f_table_catalog'),
//   // TODO: failed to parse database type 'name'
//   fTableSchema: unknown('f_table_schema'),
//   // TODO: failed to parse database type 'name'
//   fTableName: unknown('f_table_name'),
//   // TODO: failed to parse database type 'name'
//   fGeographyColumn: unknown('f_geography_column'),
//   coordDimension: integer('coord_dimension'),
//   srid: integer(),
//   type: text(),
// }).as(
//   sql`SELECT current_database() AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geography_column, postgis_typmod_dims(a.atttypmod) AS coord_dimension, postgis_typmod_srid(a.atttypmod) AS srid, postgis_typmod_type(a.atttypmod) AS type FROM pg_class c, pg_attribute a, pg_type t, pg_namespace n WHERE t.typname = 'geography'::name AND a.attisdropped = false AND a.atttypid = t.oid AND a.attrelid = c.oid AND c.relnamespace = n.oid AND (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`
// )
