import { NextRequest, NextResponse } from 'next/server'
import { generateFeed } from '@/lib/feed'
import { fetchEventsWithPagination } from '@/queryFunctions/events'

export async function GET(req: NextRequest) {
  try {
    // Request headers for caching
    const ifModifiedSince = req.headers.get('if-modified-since')
    const ifNoneMatch = req.headers.get('if-none-match')

    const modifiedSinceDate = ifModifiedSince
      ? new Date(ifModifiedSince).toISOString()
      : new Date(0).toISOString()

    const { searchParams } = new URL(req.url)
    const tagsParam = searchParams.get('tags')
    const tags = tagsParam ? tagsParam.split(',') : undefined

    const events = await fetchEventsWithPagination({
      pubDate: modifiedSinceDate,
      tagNames: tags || [], // tags
      first: 200, //TODO, increase as needed
      after: undefined,
      last: undefined,
      before: undefined,
    })

    const feed = generateFeed(events)
    const feedContent = feed.atom1()

    const pubDates = []

    for (const edge of (await events).edges) {
      if (edge.node && edge.node.pubDate) {
        pubDates.push(edge.node.pubDate)
      }
    }

    let mostRecent = modifiedSinceDate
      ? modifiedSinceDate
      : 'new Date(0).toISOString()'

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

    // Return the RSS feed with caching headers
    const headers = new Headers({
      'Content-Type': 'application/rss+xml',
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
