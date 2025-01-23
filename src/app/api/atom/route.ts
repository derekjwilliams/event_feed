import { NextRequest, NextResponse } from 'next/server'
import { Event } from '@/types/graphql'
import { createFeed, fetchEvents } from '@/lib/feed'

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
    const tags = tagsParam ? tagsParam.split(',') : undefined

    const events = await fetchEvents(modifiedSinceDate, tags)

    const feed = createFeed(events)
    const feedContent = feed.atom1()

    const lastModified = events.nodes.length
      ? new Date(
          Math.max(
            ...events.nodes
              .filter((node): node is Event => node !== null) // Ensure nodes are not null
              .map((node) =>
                node.pubDate
                  ? new Date(node.pubDate).getTime()
                  : new Date().getTime()
              )
          )
        ).toUTCString()
      : new Date().toUTCString()

    const etag = `"${Buffer.from(feedContent)
      .toString('base64')
      .substring(0, 16)}"`
    console.log(`ETag: ${etag}`)
    console.log(`Last-Modified: ${lastModified}`)

    // Respond with 304 if the feed hasn't changed
    if (ifNoneMatch === etag || ifModifiedSince === lastModified) {
      return new NextResponse(null, { status: 304 })
    }

    // Return the RSS feed with caching headers
    const headers = new Headers({
      'Content-Type': 'application/rss+xml',
      'Last-Modified': lastModified,
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
