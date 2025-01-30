// Event.tsx
import Image from 'next/image'

import { Event } from '@/types/graphql'

const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const eventTimeZone = 'America/Los_Angeles' // Event's time zone

  const eventStartTimeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: eventTimeZone, // Forces display in event's local time
    hour12: true, // Ensures 12-hour format
  }).format(new Date(event.eventStartDate))

  const eventEndTimeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: eventTimeZone, // Forces display in event's local time
    hour12: true, // Ensures 12-hour format
  }).format(new Date(event.eventEndDate))

  let timesMatch = eventStartTimeString === eventEndTimeString
  if (timesMatch) {
    console.log('Matchy Matchy')
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://events.willamette.edu'
  return (
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
          {event.eventStartDate && (
            <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
              {new Date(event.eventStartDate ?? '').toDateString()}
            </h3>
          )}
          {eventStartTimeString !== eventEndTimeString && (
            <h4 className="font-normal text-neutral-600 dark:text-neutral-200">
              <span>
                {eventStartTimeString} - {eventEndTimeString}
              </span>
            </h4>
          )}
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
  )
}

export default EventItem
