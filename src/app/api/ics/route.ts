import { NextRequest, NextResponse } from 'next/server'
import { generateICS } from '@/lib/feed'
import { fetchEventsWithPagination } from '@/queryFunctions/events'

const EPOCH_START = '1970-01-01'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tagNames = searchParams.get('tagNames')?.split(',') || []

  try {
    const ifModifiedSince = req.headers.get('if-modified-since') || EPOCH_START
    const ifNoneMatch = req.headers.get('if-none-match')
    const modifiedSinceDate = ifModifiedSince
      ? new Date(ifModifiedSince).toISOString()
      : new Date(0).toISOString()

    const events = await fetchEventsWithPagination({
      pubDate: modifiedSinceDate,
      tagNames: [], // tags
      first: 200, //TODO, increase as needed
      after: undefined,
      last: undefined,
      before: undefined,
    })

    const icsData = await generateICS(events)

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

    const etag = `"${Buffer.from(icsData).toString('base64').substring(0, 16)}"`

    // Respond with 304 if the feed hasn't changed
    // if (ifNoneMatch === etag || ifModifiedSince === mostRecent) {
    //   return new NextResponse(null, { status: 304 })
    // }

    const headers = new Headers({
      'Content-Type': 'text/calendar',
      'Last-Modified': mostRecent,
      // 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0', //UNCOMMENT FOR LOCAL DEBUGGING
      ETag: etag,
    })

    return new NextResponse(icsData, { status: 200, headers })
  } catch (error) {
    console.error('Error generating ICS:', error)
    return NextResponse.json(
      { error: 'Failed to generate calendar file' },
      { status: 500 }
    )
  }
}
