'use client'

import { Suspense, useRef } from 'react'
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
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  )
  const [pagination, setPagination] = useState({
    after: searchParams.get('after') || undefined,
    before: searchParams.get('before') || undefined,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openSidebar = () => {
    setIsOpen(true)
    dialogRef.current?.showModal()
    // Force iOS repaint
    requestAnimationFrame(() => {
      dialogRef.current?.classList.add('opacity-100', 'translate-x-0')
    })
  }

  const closeSidebar = () => {
    dialogRef.current?.classList.remove('opacity-100', 'translate-x-0')
    setTimeout(() => {
      dialogRef.current?.close()
      setIsOpen(false)
    }, 300)
  }
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Create a type-safe handler that works for both event types
    const handleClose = (e: MouseEvent | TouchEvent) => {
      if (e.target === dialog) closeSidebar()
    }

    // Separate handlers with proper typing
    const touchHandler = (e: TouchEvent) => handleClose(e)
    const clickHandler = (e: MouseEvent) => handleClose(e)

    // Add listeners with correct types
    dialog.addEventListener('click', clickHandler)
    dialog.addEventListener('touchstart', touchHandler)

    return () => {
      dialog.removeEventListener('click', clickHandler)
      dialog.removeEventListener('touchstart', touchHandler)
    }
  }, [])
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

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault() // Prevent the default closing behavior if needed
      closeSidebar()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [])

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
    <div className="relative min-h-screen bg-gray-50">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 h-12">
          <button
            onClick={openSidebar}
            className="fixed border-2 z-100 flex items-center p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
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

      <dialog
        ref={dialogRef}
        className={`
          fixed top-4 
          left-[calc(100%-1rem)]  // Start off-screen to the right
          w-[calc(100%-2rem)]     // Account for margins
          max-h-[90vh]
          translate-x-[-100%]     // Pull back by full width when open
          opacity-0
          transition-all duration-300 ease-in-out
          bg-white shadow-lg rounded-lg
          backdrop:bg-black/50 backdrop:opacity-0
          backdrop:transition-opacity backdrop:duration-300
          [&:not([open])]:hidden
        `}
        onClick={(e) => e.target === dialogRef.current && closeSidebar()}
      >
        <div className="flex h-full">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold"></h2>
              <button
                onClick={closeSidebar}
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
      </dialog>
    </div>
  )
}
const SuspendedEventsList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventsList />
  </Suspense>
)

export default SuspendedEventsList
