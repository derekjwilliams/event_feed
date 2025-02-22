'use client'

import { Suspense } from 'react'
import { createParser, useQueryState } from 'nuqs'
import useTagsQuery from '@/queries/tags'
import useEventsQuery from '@/queries/events'
import { Calendar } from 'lucide-react'
import EventItem from '@/components/EventItem'
import { EventsEdge, Tag, TagsEdge } from '@/types/graphql'

// Create a custom parser for the array of strings
const tagsParser = createParser({
  parse: (value: string) => value.split(',').filter(Boolean),
  serialize: (value: string[]) => value.join(','),
})

function EventsList() {
  // Use the correct syntax for nuqs hooks
  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    tagsParser.withDefault([])
  )

  const [after, setAfter] = useQueryState('after')

  const [before, setBefore] = useQueryState('before')

  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useTagsQuery()

  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
    isError,
  } = useEventsQuery({
    pubDate: new Date(0).toISOString(),
    tagNames: selectedTags,
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
      setAfter(pageInfo.endCursor || null)
      setBefore(null)
    }
  }

  const handlePrevious = () => {
    if (!eventsData) return
    const pageInfo = eventsData.pageInfo
    if (pageInfo?.hasPreviousPage) {
      setBefore(pageInfo.startCursor || null)
      setAfter(null)
    }
  }

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setAfter(null)
    setBefore(null)
    setSelectedTags(newTags.length > 0 ? newTags : null)
    // setSelectedTags(newTags)
  }

  const handleToggleAnyTag = () => {
    const allNonEmptyTagNames: string[] = []
    if (tagsData) {
      for (let i = 0; i < tagsData.edges.length; i++) {
        const edge = tagsData.edges[i]
        if (edge.node && edge.node.name !== '') {
          allNonEmptyTagNames.push(edge.node.name)
        }
      }
    }

    const areAllSelected = allNonEmptyTagNames.every((tag) =>
      selectedTags.includes(tag)
    )

    const newSelectedTags = areAllSelected
      ? selectedTags.filter((tag) => !allNonEmptyTagNames.includes(tag))
      : Array.from(new Set([...selectedTags, ...allNonEmptyTagNames]))

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
          ?.filter((edge): edge is TagsEdge & { node: Tag } => !!edge.node)
          .map((tag) => (
            <button
              key={tag.node.name}
              onClick={() => handleTagChange(tag.node.name)}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedTags.includes(tag.node.name)
                  ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
              } ${tag.node.name === '' ? 'italic' : ''}`}
            >
              {tag.node.name}
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
          .filter((edge): edge is EventsEdge & { node: Event } => !!edge.node)
          .map((edge) => (
            <EventItem key={edge.node.id} event={edge.node} />
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
