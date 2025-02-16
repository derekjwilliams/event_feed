import { NextRequest } from 'next/server'
import { handleFeedRequest } from '../feedHandler'

export async function GET(req: NextRequest) {
  return handleFeedRequest(req, (feed) => feed.rss2(), 'application/rss+xml')
}
