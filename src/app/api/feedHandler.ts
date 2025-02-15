import { NextRequest, NextResponse } from 'next/server'
import { generateFeed } from '@/lib/feed'
import { fetchEventsWithPagination } from '@/queryFunctions/events'

export type FeedFormatter = (feed: ReturnType<typeof generateFeed>) => string

export async function handleFeedRequest(
  req: NextRequest,
  feedFormatter: FeedFormatter,
  contentType: string
): Promise<NextResponse> {
  try {
    // Request headers for caching
    const ifModifiedSince = req.headers.get('if-modified-since')
    const ifNoneMatch = req.headers.get('if-none-match')

    const { searchParams } = new URL(req.url)
    const tagsParam = searchParams.get('tags')
    const tags = tagsParam ? tagsParam.split(',') : undefined
    const modifiedSinceDate = ifModifiedSince
      ? new Date(ifModifiedSince).toISOString()
      : new Date(0).toISOString().split('T')[0]

    const events = await fetchEventsWithPagination({
      pubDate: modifiedSinceDate,
      tagNames: tags || [], // tags
      first: Number(process.env.EVENT_LIST_PAGE_SIZE) || 200, //TODO, change as needed
      after: undefined,
      last: undefined,
      before: undefined,
    })

    const feed = generateFeed(events)
    const feedContent = feedFormatter(feed)

    const pubDates = []
    for (const node of events.nodes) {
      if (node && node.pubDate) {
        pubDates.push(node.pubDate)
      }
    }

    let mostRecent = modifiedSinceDate
      ? modifiedSinceDate
      : new Date(0).toISOString().split('T')[0]

    if (pubDates.length) {
      mostRecent = pubDates.reduce((max, date) =>
        new Date(date) > new Date(max) ? date : max
      )
    }

    const etag = `"${Buffer.from(feedContent)
      .toString('base64')
      .substring(0, 16)}"`

    // Respond with 304 if the feed hasn't changed
    if (ifNoneMatch === etag || ifModifiedSince === mostRecent) {
      return new NextResponse(null, { status: 304 })
    }

    // Return the feed with caching headers
    const headers = new Headers({
      'Content-Type': contentType,
      'Last-Modified': mostRecent,
      ETag: etag,
    })
    return new NextResponse(feedContent, { status: 200, headers })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      return new NextResponse(JSON.stringify(error), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}
