'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useEventsQuery from '@/app/hooks/useEventsQuery'
import { useTagsQuery } from '@/app/hooks/useTagsQuery'
import EventItem from './EventItem'
import { Tag, EventWithTags } from '@/app/events/eventTypes'
import TagsFilter from './TagsFilter'

function EventList() {
  const searchParams = useSearchParams()
  // const router = useRouter()

  // Extract query params from URL
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  )
  const [pagination, setPagination] = useState({
    after: searchParams.get('after') || undefined,
    before: searchParams.get('before') || undefined,
    hasNextPage: false,
    hasPreviousPage: false,
    first: Number(searchParams.get('first')) || 10, //TODO
    last: Number(searchParams.get('last')) || 10, //TODO
  })

  // Fetch all available tags
  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useTagsQuery()

  // Fetch events based on selectedTags and pagination
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

  // Update URL search params when selectedTags or pagination changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    } else {
      params.delete('tags')
    }

    //    debugger

    // if (eventsData && eventsData.pageInfo.hasNextPage) {
    //   if (pagination.after) {
    //     params.set('after', pagination.after)
    //   }
    // } else {
    //   params.delete('after')
    // }

    // if (pagination.after) {
    //   params.set('after', pagination.after)
    //   params.delete('before') // Ensure only one cursor is set at a time
    // } else if (pagination.before) {
    //   params.set('before', pagination.before)
    //   params.delete('after')
    // } else {
    //   params.delete('after')
    //   params.delete('before')
    // }

    if (eventsData && eventsData.pageInfo.hasNextPage) {
      if (pagination.after) {
        params.set('after', pagination.after)
      }
    } else {
      params.delete('after')
    }
    if (eventsData && eventsData.pageInfo.hasPreviousPage) {
      if (pagination.before) {
        params.set('before', pagination.before)
      }
    } else {
      params.delete('before')
    }
    window.history.replaceState({}, '', `?${params.toString()}`)
    // router.push(`?${params.toString()}`, { scroll: false })
  }, [selectedTags, pagination, searchParams, eventsData])
  //[selectedTags, pagination, router, searchParams])

  const handleNext = () => {
    const pageInfo = eventsData?.pageInfo
    if (pageInfo?.hasNextPage) {
      setPagination({
        after: pageInfo.endCursor || undefined,
        before: undefined,
        hasNextPage: false,
        hasPreviousPage: true,
        first: 10, //TODO
        last: 10, //TODO
      })
    }
  }

  const handlePrevious = () => {
    if (!eventsData?.pageInfo?.startCursor) return
    setPagination({
      before: eventsData.pageInfo.startCursor,
      after: undefined,
      hasNextPage: true, // Assume there can be a next page
      hasPreviousPage: eventsData.pageInfo.hasPreviousPage,
      first: 10, //TODO
      last: 10, //TODO
    })
  }

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    setSelectedTags(newTags)
    setPagination({
      after: undefined,
      before: undefined,
      hasNextPage: false,
      hasPreviousPage: false,
      first: 10, //TODO
      last: 10, //TODO
    })
  }

  const handleToggleAnyTag = () => {
    const allNonEmptyTagNames =
      tagsData
        ?.filter((tag: Tag) => tag && tag.name !== '') // Remove null and empty values
        .map((tag: Tag) => tag.name) ?? []

    const areAllSelected = allNonEmptyTagNames.every((tag: string) =>
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
      <TagsFilter
        tagsLoading={tagsLoading}
        tagsError={tagsError}
        tagsData={tagsData}
        selectedTags={selectedTags}
        handleTagChange={handleTagChange}
        handleToggleAnyTag={handleToggleAnyTag}
      />

      {eventsLoading && !eventsData && (
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
        {(eventsData?.data || []).map((event: EventWithTags) => (
          <EventItem key={event.event.id} event={event} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={!eventsData?.pageInfo?.hasPreviousPage || eventsLoading}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
        >
          Previous
        </button>
        {eventsLoading && (
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        )}
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
    <EventList />
  </Suspense>
)

export default SuspendedEventsList
