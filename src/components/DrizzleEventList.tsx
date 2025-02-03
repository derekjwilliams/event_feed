'use client'

import { useState } from 'react'
import { getAllTags, getEventsWithTags } from '@/app/events/actions'
import { EventWithTags } from '@/app/events/eventTypes'
import TagsFilter from './DrizzleTagsFilter'

export default function EventsList({
  allTagNames,
  initialEvents,
  initialTags,
  nextCursor,
}: {
  allTagNames: string[]
  initialEvents: EventWithTags[]
  initialTags: string[]
  nextCursor: string | null
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [events, setEvents] = useState(initialEvents)
  const [cursor, setCursor] = useState<string | null>(nextCursor)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleNextPage = async () => {
    if (cursor) {
      const { result, nextCursor: newCursor } = await getEventsWithTags(
        selectedTags,
        cursor,
        2 //TODO limit
      )
      setEvents(result) // Update event list
      setCursor(newCursor)
    }
  }

  const handleTagChange = async (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    alert(JSON.stringify(newTags))
    setSelectedTags(newTags)

    // Fetch filtered events
    const { result, nextCursor: newCursor } = await getEventsWithTags(
      newTags,
      '2010-01-01',
      10
    )
    setEvents(result)
    setCursor(newCursor)
  }
  return (
    <div>
      <TagsFilter
        selectedTags={selectedTags}
        handleTagChange={handleTagChange}
        allTagNames={allTagNames}
      />
      <p style={{ whiteSpace: 'pre' }}>{`${JSON.stringify(
        initialTags,
        null,
        2
      )}`}</p>
      <div>{`${events.length}`}</div>
      <ul>
        {events.map((eventTagWrapper: EventWithTags) => (
          <li key={eventTagWrapper.event.id}>
            <h3>
              {eventTagWrapper.event.title} (
              {eventTagWrapper.event.eventStartDate})
            </h3>
            <div>id: {eventTagWrapper.event.title}</div>
            <p>Tags: {eventTagWrapper.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
      {cursor && (
        <div>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
    </div>
  )
}

{
  /* Pagination controls */
}
{
  /* {cursor && (
        <div>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )} */
}
//  )
// }
//   const searchParams = useSearchParams()
//   const [selectedTags, setSelectedTags] = useState<string[]>(
//     searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
//   )
//   const [pagination, setPagination] = useState({
//     after: searchParams.get('after') || undefined,
//     before: searchParams.get('before') || undefined,
//     hasNextPage: false,
//     hasPreviousPage: false,
//   })

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set('tags', selectedTags.join(','))
//     params.set('after', pagination.after || '')
//     params.set('before', pagination.before || '')
//     window.history.replaceState({}, '', `?${params.toString()}`)
//   }, [selectedTags, pagination, searchParams])

//   // Get all of the available tags
//   const {
//     data: tagsData,
//     isLoading: tagsLoading,
//     error: tagsError,
//   } = useTagsQuery()

//   // Get the evenst, independent of date, with selectedTags, and pagination settings, which we set in the useEffect
//   const {
//     data: eventsData,
//     isLoading: eventsLoading,
//     error: eventsError,
//     isError,
//   } = useEventsQuery({
//     pubDate: new Date(0).toISOString(),
//     tagNames: selectedTags,
//     pagination,
//   })

//   const handleNext = () => {
//     const pageInfo = eventsData?.pageInfo
//     if (pageInfo?.hasNextPage) {
//       setPagination({
//         after: pageInfo.endCursor || undefined,
//         before: undefined,
//         hasNextPage: false,
//         hasPreviousPage: true,
//       })
//     }
//   }

//   const handlePrevious = () => {
//     if (!eventsData) return
//     const { hasPreviousPage, startCursor } = eventsData.pageInfo
//     if (hasPreviousPage) {
//       setPagination({
//         before: startCursor || undefined,
//         after: undefined,
//         hasNextPage: true,
//         hasPreviousPage: false,
//       })
//     }
//   }

//   const handleTagChange = (tag: string) => {
//     const newTags = selectedTags.includes(tag)
//       ? selectedTags.filter((t) => t !== tag)
//       : [...selectedTags, tag]
//     setPagination({
//       before: undefined,
//       after: undefined,
//       hasNextPage: true,
//       hasPreviousPage: false,
//     })
//     setSelectedTags(newTags)
//   }

//   return (
//     <div className="space-y-4">
//       <a
//         href="webcal://event-feed-eta.vercel.app/api/ics"
//         className="float-right bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
//       >
//         <Calendar className="h-5 w-5" />
//       </a>
//       {/* Tag Filter */}
//       <div className="flex gap-2 flex-wrap">
//         {tagsLoading && (
//           <div className="space-x-2 animate-pulse">
//             {[...Array(4)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-8 w-20 bg-neutral-200 rounded-full inline-block"
//               />
//             ))}
//           </div>
//         )}
//         {tagsError && (
//           <div className="text-red-500">
//             Error loading tags: {tagsError.message}
//           </div>
//         )}
//         {tagsData?.nodes
//           ?.filter((tag): tag is NonNullable<typeof tag> => !!tag)
//           .map((tag) => (
//             <button
//               key={tag.name}
//               onClick={() => handleTagChange(tag.name)}
//               className={`px-3 py-1 rounded-full transition-colors ${
//                 selectedTags.includes(tag.name)
//                   ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
//                   : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
//               }`}
//             >
//               {tag.name}
//             </button>
//           ))}
//       </div>
//       {eventsLoading && !eventsData && (
//         // Five empty events for loading
//         <div className="space-y-4 animate-pulse">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="h-32 bg-neutral-100 rounded-lg"></div>
//           ))}
//         </div>
//       )}
//       {isError && (
//         <div className="p-4 text-red-600 bg-red-50 rounded-lg">
//           Error: {eventsError?.message}
//         </div>
//       )}
//       {(eventsData?.nodes || [])
//         .filter((event): event is NonNullable<typeof event> => event !== null)
//         .map((event) => (
//           <EventItem key={event.id} event={event} />
//         ))}{' '}
//       <div className="flex justify-between items-center">
//         <button
//           onClick={handlePrevious}
//           disabled={!eventsData?.pageInfo?.hasPreviousPage || eventsLoading}
//           className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
//         >
//           Previous
//         </button>
//         <div className="flex items-center gap-4">
//           {eventsLoading && (
//             <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
//           )}
//         </div>
//         <button
//           onClick={handleNext}
//           disabled={!eventsData?.pageInfo?.hasNextPage || eventsLoading}
//           className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded disabled:opacity-50 text-gray-800 dark:text-neutral-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }
// const SuspendedEventsList = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <EventsList />
//   </Suspense>
// )

// export default SuspendedEventsList
