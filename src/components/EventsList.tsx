'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useTagsQuery from '@/queries/tags'
import useEventsQuery from '@/queries/events'
import EventItem from '@/components/EventItem'
import { EventsEdge } from '@/types/graphql'
import TagsFilter from './TagsFilter'
import { X, Menu } from 'lucide-react'

function EventsList() {
  const pageSize = Number(process.env.NEXT_PUBLIC_EVENT_LIST_PAGE_SIZE) || 50
  const searchParams = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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
    pageSize,
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
    // Get all non-empty tag names from tagsData.edges (filter out null and empty strings)
    const allNonEmptyTagNames: string[] = []
    if (tagsData) {
      for (let i = 0; i < tagsData.edges.length; i++) {
        const edge = tagsData.edges[i]
        if (edge.node && edge.node.name !== '') {
          allNonEmptyTagNames.push(edge.node.name)
        }
      }
    }

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
    <div className="relative min-h-screen bg-gray-50  dark:bg-neutral-400">
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`cursor-pointer fixed top-0 flex items-center bg-neutral-100 dark:bg-neutral-400 disabled:opacity-50 text-gray-800 dark:text-neutral-100 z-50 rounded-full gap-2 p-2 m-2 ${
              isSidebarOpen ? 'invisible' : ''
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {(eventsData?.edges || [])
              .filter(
                (edge): edge is EventsEdge & { node: Event } => !!edge.node
              )
              .map((edge) => (
                <EventItem key={edge.node.id} event={edge.node} />
              ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
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
      </div>

      {/* Backdrop */}
      <div
        className={`absolute inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isSidebarOpen
            ? 'opacity-20 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      ></div>
      {/* Sidebar */}
      <div
        className={`fixed m-4 top-0 left-0 right-0 z-50 bg-white overflow-y-auto shadow-lg transition-all duration-300 ease-in-out transform ${
          isSidebarOpen
            ? 'translate-x-0 opacity-100 rounded pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className=" dark:bg-neutral-400 flex items-center justify-between p-2 border-b">
          <h2 className="text-lg font-semibold"> </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <TagsFilter
          tagsLoading={tagsLoading}
          tagsError={tagsError}
          tagsData={tagsData}
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
          handleToggleAnyTag={handleToggleAnyTag}
        />
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
