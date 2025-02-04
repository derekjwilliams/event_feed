'use client'

import { useState } from 'react'
import { getAllTags, getEventsWithTags } from '@/app/events/actions'
import { EventWithTags } from '@/app/events/eventTypes'
import TagsFilter from './TagsFilter'
import EventItem from './EventItem'

export default function EventList({
  initialEvents,
  nextCursor,
  hasMore,
}: {
  allTagNames: string[]
  initialEvents: EventWithTags[]
  initialTags: string[]
  nextCursor: string | null
  hasMore: boolean
}) {
  const pageSize = 10
  const [events, setEvents] = useState(initialEvents)
  const [cursor, setCursor] = useState<string | null>(nextCursor)
  const [prevCursor, setPrevCursor] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true)
  const [hasPrevious, setHasPrevious] = useState<boolean>(false)

  const handleTagChange = async (tag: string) => {
    if (!cursor) {
      console.log('bad cursor?')
      //return
    }
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)

    // Fetch filtered events
    const { result, nextCursor, hasMore } = await getEventsWithTags(
      newTags,
      null,
      pageSize,
      'next'
    ) // why 'next here'?

    setEvents(result)
    setCursor(nextCursor)
    setPrevCursor(null) // Store the current cursor as the previous cursor
    setHasMoreEvents(hasMore)
    setHasPrevious(false)
  }
  const handleNextPage = async () => {
    console.log('handle Next Page')
    if (!cursor) return // No cursor, can't load next page

    const { result, nextCursor, hasMore } = await getEventsWithTags(
      selectedTags,
      cursor,
      pageSize,
      'next'
    )

    setEvents(result)
    setCursor(nextCursor) // Store the new encoded cursor
    setPrevCursor(cursor) // Keep the current cursor as the previous one
    setHasMoreEvents(hasMore)
    setHasPrevious(true)
  }
  const handlePreviousPage = async () => {
    if (!prevCursor) {
      setHasPrevious(false)
      return // No previous cursor, can't load previous page
    }

    const { result, nextCursor } = await getEventsWithTags(
      selectedTags,
      prevCursor,
      pageSize,
      'previous'
    )
    setEvents(result)
    const disablePrevious = cursor === prevCursor
    setCursor(prevCursor) // Move cursor back
    setPrevCursor(nextCursor) // Store new previous cursor
    setHasPrevious(!!prevCursor)
    setHasMoreEvents(hasMore)
    if (disablePrevious) {
      setHasPrevious(false)
    }
  }
  return (
    <div className="space-y-4">
      {/* <div>{nextCursor}</div> */}
      <TagsFilter
        selectedTags={selectedTags}
        handleTagChange={handleTagChange}
      />
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        {events.map((eventTagWrapper) => (
          <EventItem key={eventTagWrapper.event.id} {...eventTagWrapper} />
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPrevious} // Disable if no previous cursor is available
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasMoreEvents}
          // disabled={!cursor} // Disable if no next cursor is available
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
