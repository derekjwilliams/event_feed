'use server'

import { getAllTags, getEventsWithTags } from './actions' // Server action
import EventList from '@/components/EventList' // Client-side component

export default async function EventsPage() {
  const initialCursor = null // Start pagination from the beginning
  const tagNames: string[] = [] // Start with no filters
  const defaultNumberOfEvents = 100 // Default page size

  // Fetch initial data on the server
  const { result, nextCursor, hasMore } = await getEventsWithTags(
    tagNames,
    initialCursor,
    defaultNumberOfEvents,
    'next'
  )

  const allTags = await getAllTags()

  return (
    <div className="p-4 m-2">
      {/* Pass fetched data to the client-side component */}
      <EventList
        allTagNames={allTags.map((tag) => tag.name)}
        initialEvents={result}
        initialTags={[]}
        nextCursor={nextCursor} // Pass the new encoded cursor
        hasMore={hasMore}
      />
    </div>
  )
}
