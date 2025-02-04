import { NextResponse } from 'next/server'
import { db } from '@/utils/db'
import { tags } from '@/db/generated_schema'

export async function GET() {
  try {
    const result = await db.select().from(tags).orderBy(tags.name)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
