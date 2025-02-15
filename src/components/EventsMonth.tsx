'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useTagsQuery from '@/queries/tags'
import useEventsQuery from '@/queries/events'
import { Calendar } from 'lucide-react'
import EventItem from '@/components/EventItem'
import { TagsEdge } from '@/types/graphql'

// Feature - Implement as React Server Components to further improve performance and lower server load
// This is most easily done by
function EventsMonth() {
  const searchParams = useSearchParams()
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  )
  const [pagination, setPagination] = useState({
    after: searchParams.get('after') || undefined,
    before: searchParams.get('before') || undefined,
    hasNextPage: false,
    hasPreviousPage: false,
  })

  // Get all of the available tags
  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useTagsQuery()

  // Get the events, independent of date, with selectedTags, and pagination settings, which we set in the useEffect
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
    isError,
  } = useEventsQuery({
    pubDate: new Date(0).toISOString(),
    tagNames: selectedTags,
    pagination,
  })

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    } else {
      params.delete('tags')
    }
    if (eventsData && eventsData.pageInfo.hasNextPage) {
      if (pagination.after) {
        params.set('after', pagination.after)
      }
    } else {
      if (!pagination.after) {
        params.delete('after')
      }
    }
    if (eventsData && eventsData.pageInfo.hasPreviousPage) {
      if (pagination.before) {
        params.set('before', pagination.before)
      }
    } else {
      params.delete('before')
      if (!pagination.after) {
        params.delete('after')
      }
    }
    window.history.replaceState({}, '', `?${params.toString()}`)
  }, [selectedTags, pagination, searchParams, eventsData])

  const handleNext = () => {
    const pageInfo = eventsData?.pageInfo
    if (pageInfo?.hasNextPage) {
      setPagination({
        after: pageInfo.endCursor || undefined,
        before: undefined,
        hasNextPage: pageInfo?.hasNextPage,
        hasPreviousPage: pageInfo?.hasPreviousPage,
      })
    }
  }

  const handlePrevious = () => {
    if (!eventsData) return
    const pageInfo = eventsData.pageInfo
    if (pageInfo?.hasPreviousPage) {
      setPagination({
        before: pageInfo.startCursor || undefined,
        after: undefined,
        hasNextPage: pageInfo?.hasNextPage,
        hasPreviousPage: pageInfo?.hasPreviousPage,
      })
    }
  }

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setPagination({
      before: undefined,
      after: undefined,
      hasNextPage: true,
      hasPreviousPage: false,
    })
    setSelectedTags(newTags)
  }

  const handleToggleAnyTag = () => {
    // Get all non-empty tag names from tagsData.nodes (filter out null and empty strings)
    const allNonEmptyTagNames =
      tagsData?.edges
        ?.filter(
          (edge): edge is TagsEdge => !!edge.node && edge.node.name !== ''
        )
        .map((edge) => edge.node.name) ?? []

    // Check if every non-empty tag is currently selected
    const areAllSelected = allNonEmptyTagNames.every((tag) =>
      selectedTags.includes(tag)
    )

    let newSelectedTags: string[]
    if (areAllSelected) {
      // Remove all non-empty tags from selectedTags
      newSelectedTags = selectedTags.filter(
        (tag) => !allNonEmptyTagNames.includes(tag)
      )
    } else {
      // Add all non-empty tags to selectedTags, ensuring no duplicates
      newSelectedTags = Array.from(
        new Set([...selectedTags, ...allNonEmptyTagNames])
      )
    }
    setSelectedTags(newSelectedTags)
  }

  return (
    <div className="space-y-4">
      {/* Tag Filter */}
      <div className="flex gap-2 flex-wrap">
        {tagsLoading && (
          <div className="space-x-2 animate-pulse">
            {[...Array(20)].map((_, i) => (
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
        {tagsData?.edges
          ?.filter((edge): edge is NonNullable<typeof edge> => !!edge)
          .map((edge) => (
            <button
              key={edge.node.name}
              onClick={() => handleTagChange(edge.node.name)}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedTags.includes(edge.node.name)
                  ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
              } ${edge.node.name === '' ? 'italic' : ''}`}
            >
              {edge.node.name}
            </button>
          ))}

        <div className="ml-auto">
          <button
            key={''}
            onClick={() => handleTagChange('')}
            className={`mx-4 px-3 py-1 rounded-full transition-colors ${
              selectedTags.includes('')
                ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300 italic'
            }`}
          >
            Not Tagged
          </button>
          <button
            onClick={handleToggleAnyTag}
            className="px-3 py-1 rounded-full transition-colors bg-blue-600 dark:bg-amber-200  saturate-25  text-white dark:text-black"
          >
            Any Tagged
          </button>
        </div>
        <a
          href="webcal://event-feed-eta.vercel.app/api/ics"
          className="float-right bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          <Calendar className="h-5 w-5" />
        </a>
      </div>

      {eventsLoading && !eventsData && (
        // Empty events for loading
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-neutral-100 rounded-lg min-h-96"
            ></div>
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 text-red-600 bg-red-50 rounded-lg">
          Error: {eventsError?.message}
        </div>
      )}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        {(eventsData?.edges || [])
          .filter((edge): edge is NonNullable<typeof edge> => edge !== null)
          .map((edge, index) => (
            <EventItem key={index} event={edge.node} />
          ))}{' '}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={!eventsData?.pageInfo?.hasPreviousPage || eventsLoading}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Previous
        </button>
        <div className="flex items-center gap-4">
          {eventsLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={!eventsData?.pageInfo?.hasNextPage || eventsLoading}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
const SuspendedEventsList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventsList />
  </Suspense>
)

export default SuspendedEventsList
