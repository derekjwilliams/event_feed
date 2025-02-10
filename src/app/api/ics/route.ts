import { NextRequest, NextResponse } from 'next/server'
import { generateICS } from '@/lib/feed'
import env from '@/env'

export async function GET(req: NextRequest) {
  try {
    // Request headers for caching
    const ifModifiedSince = req.headers.get('if-modified-since')
    const ifNoneMatch = req.headers.get('if-none-match')

    const modifiedSinceDate = ifModifiedSince
      ? new Date(ifModifiedSince).toISOString()
      : undefined

    const { searchParams } = new URL(req.url)
    const tagsParam = searchParams.get('tags')
    let url = env.EVENTS_FEED_LINK
    if (tagsParam) {
      url += '?tags=' + tagsParam
    }

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'sec-fetch-mode': 'cors',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },

      method: 'GET',
    })
    const { data: events } = await response.json()
    const feedContent = await generateICS(events)

    const pubDates = []
    for (const event of events) {
      if (event && event.pubDate) {
        pubDates.push(event.pubDate)
      }
    }

    let mostRecent = modifiedSinceDate
      ? modifiedSinceDate
      : new Date(0).toISOString()

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
      'Content-Type': 'application/json',
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
