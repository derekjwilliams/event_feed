'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { EventsResponse, TagsResponse } from '../types'
import Image from 'next/image'
import { EVENTS_QUERY, TAGS_QUERY } from '@/graphql_queries/queries'

interface FetchEventsVariables {
  pubDate: string
  tagNames: string[]
  first?: number
  after?: string
  last?: number
  before?: string
}

const fetchTags = async () => {
  const response = await fetch('https://event-graphql.vercel.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TAGS_QUERY,
    }),
  })

  if (!response.ok) throw new Error('Failed to fetch tags')
  const { data, errors } = await response.json()

  if (errors) throw new Error(errors[0].message)
  return data as TagsResponse
}

const fetchEvents = async (variables: FetchEventsVariables) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: EVENTS_QUERY,
      variables: {
        pubDate: variables.pubDate,
        tagNames: variables.tagNames,
        first: variables.first,
        after: variables.after,
        last: variables.last,
        before: variables.before,
      },
    }),
  })

  if (!response.ok) throw new Error('Failed to fetch events')
  const { data, errors } = await response.json()

  if (errors) throw new Error(errors[0].message)
  return data as EventsResponse
}

export default function EventsList() {
  const [pubDate] = useState(new Date(0).toISOString())
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [pageSize] = useState(20)
  const [pagination, setPagination] = useState<{
    after?: string
    before?: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }>({ hasNextPage: false, hasPreviousPage: false })

  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { pubDate, tagNames: selectedTags, ...pagination }],
    queryFn: () =>
      fetchEvents({
        pubDate,
        tagNames: selectedTags,
        first: !pagination.before ? pageSize : undefined,
        after: pagination.after,
        last: pagination.before ? pageSize : undefined,
        before: pagination.before,
      }),
    placeholderData: (previous) => previous,
    retry: 2,
    retryDelay: 1000,
    //keepPreviousData: true,
  })
  const handleNext = () => {
    // Always use fresh data from the query rather than state
    const pageInfo = data?.getEventsByDateAndTags.pageInfo

    if (pageInfo?.hasNextPage) {
      setPagination({
        // Move forward using the end cursor
        after: pageInfo.endCursor || undefined,
        // Clear backward cursor
        before: undefined,
        // Reset page status flags (will be updated by next query)
        hasNextPage: false,
        hasPreviousPage: true,
      })
    }
  }

  const handlePrevious = () => {
    if (!data) return

    const { hasPreviousPage, startCursor } =
      data.getEventsByDateAndTags.pageInfo

    if (hasPreviousPage) {
      setPagination({
        before: startCursor || undefined, // Move backward from this cursor
        after: undefined, // Clear forward navigation
        hasNextPage: true, // Now we can go forward again
        hasPreviousPage: false, // Assume no previous until refetch
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Tag Filter */}
      <div className="flex gap-2 flex-wrap">
        {tagsLoading && (
          <div className="space-x-2 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 bg-neutral-200 rounded-full inline-block"
              />
            ))}
          </div>
        )}

        {tagsError && (
          <div className="text-red-500">
            Error loading tags: {tagsError.message}
          </div>
        )}

        {tagsData?.allTags.nodes.map((tag) => (
          <button
            key={tag.name}
            onClick={() =>
              setSelectedTags((prev) =>
                prev.includes(tag.name)
                  ? prev.filter((t) => t !== tag.name)
                  : [...prev, tag.name]
              )
            }
            className={`px-3 py-1 rounded-full transition-colors ${
              selectedTags.includes(tag.name)
                ? 'light:bg-blue-500 light:text-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {isLoading && !data && (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map(
            (
              _,
              i // TODO why 3 here?
            ) => (
              <div key={i} className="h-32 bg-neutral-100 rounded-lg"></div>
            )
          )}
        </div>
      )}

      {isError && (
        <div className="p-4 text-red-600 bg-red-50 rounded-lg">
          Error: {error?.message}
        </div>
      )}

      {/* Events List */}
      {data?.getEventsByDateAndTags.nodes.map((event) => (
        <div
          key={event.id}
          className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
        >
          <div className="flex gap-4">
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={256}
                height={256}
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-100 mt-2">
                {event.description}
              </p>
              <div className="mt-2 flex gap-2">
                {event.eventTagsByEventId.nodes.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {tag.tagByTagId.name}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                {new Date(event.eventStartDate).toLocaleDateString()} -
                {new Date(event.eventEndDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={
            !data?.getEventsByDateAndTags.pageInfo.hasPreviousPage || isLoading
          }
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Previous
        </button>

        <div className="flex items-center gap-4">
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={
            !data?.getEventsByDateAndTags.pageInfo.hasNextPage || isLoading
          }
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
