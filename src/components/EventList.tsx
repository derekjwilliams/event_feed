'use client'
import { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchEventsWithTags } from '@/app/events/api'
import TagsFilter from './TagsFilter'
import EventItem from './EventItem'
import { EventWithTags } from '@/app/events/eventTypes'

export default function EventList({
  initialEvents,
  nextCursor,
  hasMore,
  direction = 'next',
}: {
  allTagNames: string[]
  initialEvents: EventWithTags[]
  initialTags: string[]
  nextCursor: string | null
  hasMore: boolean
  direction: 'next' | 'previous'
}) {
  const pageSize = 10
  const [events, setEvents] = useState<EventWithTags[]>(initialEvents)
  const [cursor, setCursor] = useState<string | null>(nextCursor)
  const [prevCursor, setPrevCursor] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true)
  const [hasPrevious, setHasPrevious] = useState<boolean>(false)
  const queryClient = useQueryClient()

  // Debounced tag change handler
  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    setSelectedTags(newTags) // Update selected tags state

    setPrevCursor(null) // Reset previous cursor when selecting new tags
    setHasPrevious(false)
    setHasMoreEvents(true) // Assume more results exist
    setCursor(null) // Reset cursor

    // Invalidate queries with a delay to avoid multiple requests
    queryClient.invalidateQueries({
      queryKey: ['events', newTags, cursor, pageSize, direction],
    })
  }

  // Fetch data with selected tags, cursor, and page size
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', selectedTags, cursor, pageSize, direction] as const,
    queryFn: () =>
      fetchEventsWithTags(selectedTags, cursor, pageSize, direction),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: selectedTags.length > 0 || cursor !== null, // Ensure it only runs if there are selected tags or a cursor
  })

  const fetchNextPage = useMutation({
    mutationFn: async () => {
      if (!cursor) return null
      return await fetchEventsWithTags(selectedTags, cursor, pageSize, 'next')
    },
    onSuccess: ({ result, nextCursor, hasMore }) => {
      setEvents((prevEvents) => [...prevEvents, ...result])
      setPrevCursor(cursor)
      setCursor(nextCursor)
      setHasMoreEvents(hasMore)
      setHasPrevious(true)
    },
  })

  const fetchPreviousPage = useMutation({
    mutationFn: async () => {
      if (!prevCursor) return null
      return await fetchEventsWithTags(
        selectedTags,
        prevCursor,
        pageSize,
        'previous'
      )
    },
    onSuccess: ({ result, nextCursor }) => {
      setEvents(result)
      setCursor(prevCursor)
      setPrevCursor(nextCursor)
      setHasPrevious(!!prevCursor)
      setHasMoreEvents(true)
    },
  })

  const handleNextPage = () => {
    if (!cursor) return
    fetchNextPage.mutate()
  }

  const handlePreviousPage = () => {
    if (!prevCursor) return
    fetchPreviousPage.mutate()
  }

  return (
    <div className="space-y-4">
      <TagsFilter
        selectedTags={selectedTags}
        handleTagChange={handleTagChange} // Use the debounced tag handler
      />
      {data && data.result && (
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {data.result.map((eventTagWrapper: EventWithTags) => (
            <EventItem key={eventTagWrapper.event.id} {...eventTagWrapper} />
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPrevious}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasMoreEvents}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
