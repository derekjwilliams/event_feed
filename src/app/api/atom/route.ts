import { NextRequest } from 'next/server'
import { handleFeedRequest } from '../feedHandler'

export async function GET(req: NextRequest) {
  return handleFeedRequest(req, (feed) => feed.atom1(), 'application/rss+xml')
}
