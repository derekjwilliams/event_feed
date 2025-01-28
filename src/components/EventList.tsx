'use client'
import { useQueryStates, StringParam, ArrayParam } from 'nuqs'
import { useState } from 'react'
import Image from 'next/image'
import CalendarButton from './ui/CalendarButton'
import useTagsQuery from '@/queries/tags'
import useEventsQuery from '@/queries/events'
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://events.willamette.edu'

export default function EventsList() {
  const defaultPubDate = new Date(0).toISOString() // Default for "all events"
  const defaultTagNames: string[] = [] // Default for tags

  const [query, setQuery] = useQueryStates({
    pubDate: {
      serialize: (value: string) => value, // Serialize the string to the URL
      parse: (value: string | undefined) => value ?? defaultPubDate, // Parse the string or fallback to default
    },
    tagNames: {
      serialize: (value: string[]) => value.join(','), // Serialize the array into a comma-separated string
      parse: (value: string | undefined) =>
        value ? value.split(',') : defaultTagNames, // Parse the string or fallback to default
    },
    after: {
      serialize: (value: string | undefined) => value ?? '', // Serialize optional string
      parse: (value: string | undefined) => value || undefined, // Parse optional string
    },
    before: {
      serialize: (value: string | undefined) => value ?? '', // Serialize optional string
      parse: (value: string | undefined) => value || undefined, // Parse optional string
    },
  })
  const { pubDate, tagNames, after, before } = query

  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useTagsQuery()

  const {
    data: eventsData,
    isLoading,
    error,
    isError,
  } = useEventsQuery({
    pubDate: pubDate ?? defaultPubDate,
    tagNames: tagNames ?? defaultTagNames,
    pagination: {
      after: after || undefined,
      before: before || undefined,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  })

  const handleNext = () => {
    const pageInfo = eventsData?.pageInfo
    if (pageInfo?.hasNextPage) {
      setQuery({ after: pageInfo.endCursor, before: undefined })
    }
  }

  const handlePrevious = () => {
    const pageInfo = eventsData?.pageInfo
    if (pageInfo?.hasPreviousPage) {
      setQuery({ before: pageInfo.startCursor, after: undefined })
    }
  }

  const toggleTag = (tag: string) => {
    setQuery({
      tagNames: tagNames?.includes(tag)
        ? tagNames.filter((t) => t !== tag)
        : [...(tagNames ?? []), tag], // Handle null with a default empty array
    })
  }

  return (
    <div className="space-y-4">
      <CalendarButton calendarUrl="https://event-feed-eta.vercel.app/events" />

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

        {tagsData?.nodes
          ?.filter((tag): tag is NonNullable<typeof tag> => !!tag)
          .map((tag) => (
            <button
              key={tag.name}
              onClick={() => toggleTag(tag.name)}
              className={`px-3 py-1 rounded-full transition-colors ${
                tagNames?.includes(tag.name)
                  ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
              }`}
            >
              {tag.name}
            </button>
          ))}
      </div>

      {/* Events */}
      {isLoading && !eventsData && (
        <div className="space-y-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-neutral-100 rounded-lg"></div>
          ))}
        </div>
      )}
      {isError && (
        <div className="p-4 text-red-600 bg-red-50 rounded-lg">
          Error: {error?.message}
        </div>
      )}
      {eventsData?.nodes
        ?.filter((event): event is NonNullable<typeof event> => !!event)
        .map((event) => (
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
                <h2 className="text-xl font-semibold">
                  {event?.link ? (
                    <a href={baseUrl + event.link}>{event.title}</a>
                  ) : (
                    <span>{event.title}</span>
                  )}
                </h2>
                <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
                  {new Date(event.eventStartDate).toDateString()}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-100 mt-2">
                  {event.description}
                </p>
                <div className="mt-2 flex gap-2">
                  {event.eventTagsByEventId.nodes
                    .filter(
                      (
                        tag
                      ): tag is NonNullable<typeof tag> & {
                        tagByTagId: { name: string }
                      } => !!tag && !!tag.tagByTagId
                    )
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-600 rounded text-sm"
                      >
                        {tag.tagByTagId.name}
                      </span>
                    ))}
                </div>
                {event.content && (
                  <div className="p-3 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
                    {event.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={!eventsData?.pageInfo?.hasPreviousPage || isLoading}
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
          disabled={!eventsData?.pageInfo?.hasNextPage || isLoading}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
