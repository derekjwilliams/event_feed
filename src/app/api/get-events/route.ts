import { NextRequest, NextResponse } from 'next/server'
import { getEventsWithTags } from '@/app/events/actions'

export async function POST(req: NextRequest) {
  try {
    const { tagNames, cursor, limit, direction } = await req.json()

    const data = await getEventsWithTags(tagNames, cursor, limit, direction)

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
