import { z } from 'zod'
import { expand } from 'dotenv-expand'
import { config } from 'dotenv'

expand(config())

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000), // NOT WORKING IN NEXT
  NEXT_PUBLIC_PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug']),
  DATABASE_URL: z
    .string()
    .default('postgres://[username]:[password]@localhost:5432/events'),
  EVENTS_PAGE_LINK: z.string().default('https://events.willamette.edu/'), //TODO, this should be per feed, not global
  RSS_EVENTS_FEED_LINK: z
    .string()
    .default('https://event-feed-eta.vercel.app/api/rss'),
  ATOM_EVENTS_FEED_LINK: z
    .string()
    .default('https://event-feed-eta.vercel.app/api/atom'),
  ICS_EVENTS_FEED_LINK: z
    .string()
    .default('https://event-feed-eta.vercel.app/api/ics'),
  JSON1_EVENTS_FEED_LINK: z
    .string()
    .default('https://event-feed-eta.vercel.app/api/json1'),
  EVENTS_FEED_LINK: z
    .string()
    .default('https://event-feed-eta.vercel.app/api/events'),
  DEFAULT_FEED_ITEM_IMAGE_URL: z
    .string()
    .default(
      'https://d1tvaw2qn8888b.cloudfront.net/cal-7e28e92c-f8a7-447f-bd60-acc4dad2eff9/square.jpg'
    ),
  ICS_UID: z
    .string()
    .default('e0bec92c-3f4b-4322-a772-a984545cab6e@event_feed.vercel.app'),
  EVENTS_PAGE_FAVICON: z.string().default('http://localhost:3000/favicon.ico'),
})
/* eslint-disable-next-line  */ // TODO node/no-process-env
const env = envSchema.parse(process.env)

export default env
