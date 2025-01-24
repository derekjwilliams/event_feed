import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './src/types/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
