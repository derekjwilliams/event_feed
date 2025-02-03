import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/db/generated_schema' // Import your Drizzle schema

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!, // Use the DATABASE_URL from .env
})

// Create a Drizzle instance with the schema and PostgreSQL client
export const db = drizzle(pool, { schema })
