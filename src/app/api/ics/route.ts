import { NextRequest, NextResponse } from 'next/server'
import { fetchEvents, generateICS } from '@/lib/feed'

const EPOCH_START = '1970-01-01'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  // const pubDate = searchParams.get('pubDate') || '1970-01-01'
  const tagNames = searchParams.get('tagNames')?.split(',') || []

  try {
    const ifModifiedSince = req.headers.get('if-modified-since') || EPOCH_START
    const ifNoneMatch = req.headers.get('if-none-match')
    const modifiedSinceDate = ifModifiedSince
      ? new Date(ifModifiedSince).toISOString()
      : undefined

    const events = await fetchEvents(modifiedSinceDate, tagNames)
    const icsData = await generateICS(events)

    const pubDates = []
    for (const node of events.nodes) {
      if (node && node.pubDate) {
        pubDates.push(node.pubDate)
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
    if (ifNoneMatch === etag || ifModifiedSince === mostRecent) {
      return new NextResponse(null, { status: 304 })
    }

    const headers = new Headers({
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="events.ics"',
      'Last-Modified': mostRecent,
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
