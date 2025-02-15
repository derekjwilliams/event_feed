import { NextRequest, NextResponse } from 'next/server'
import { generateICS } from '@/lib/feed'
import { fetchEventsWithPagination } from '@/queryFunctions/events'

const EPOCH_START = '1970-01-01'

export async function GET(req: NextRequest) {
  try {
    const ifModifiedSince = req.headers.get('if-modified-since') || EPOCH_START
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
      first: Number(process.env.EVENT_LIST_PAGE_SIZE) || 200, //TODO, change as needed
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
    if (ifNoneMatch === etag || ifModifiedSince === mostRecent) {
      return new NextResponse(null, { status: 304 })
    }

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
// NOTE: curl for ICS curl
// 'http://localhost:3000/api/ics' \
//   -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
//   -H 'Accept-Language: en-US,en;q=0.9' \
//   -H 'Connection: keep-alive' \
//   -H 'Referer: http://localhost:3000/' \
//   -H 'Sec-Fetch-Dest: document' \
//   -H 'Sec-Fetch-Mode: navigate' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'Sec-Fetch-User: ?1' \
//   -H 'Upgrade-Insecure-Requests: 1' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
//   -H 'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"'
