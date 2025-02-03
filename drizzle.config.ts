// import { defineConfig } from 'drizzle-kit'
// export default defineConfig({
//   out: './src/types/drizzle',
//   dialect: 'postgresql',
//   schema: 'public',
//   dbCredentials: {
//     url: process.env.DATABASE_URL as string,
//   },
// })

import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
