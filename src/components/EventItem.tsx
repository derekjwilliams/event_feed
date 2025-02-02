// Event.tsx
import Image from 'next/image'
import { Map } from 'lucide-react'
import { Event } from '@/types/graphql'
import Link from 'next/link'

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

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://events.willamette.edu'
  const hasGeoLocation = !!event.geoLocation
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
        </div>
      </div>
      <div>
        {event.location && (
          <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
            {hasGeoLocation && (
              <span>
                {' '}
                {event.location}
                <Link
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${event.geoLocation?.latitude},${event.geoLocation?.longitude}`}
                >
                  <Map />
                </Link>
              </span>
            )}
            {!hasGeoLocation && <span> {event.location}</span>}
          </h3>
        )}
        {!event.location && hasGeoLocation && (
          <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
            <Link
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${event.geoLocation?.latitude},${event.geoLocation?.longitude}`}
            >
              <Map />
            </Link>
          </h3>
        )}
        <p className="text-neutral-600 dark:text-neutral-100 mt-2">
          {event.description}
        </p>
        {event.content && (
          <div className="max-h-[240px] overflow-auto p-2 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
            {event.content}
          </div>
        )}
        <div className="mt-2 gap-2">
          {event.eventTagsByEventId.nodes
            .filter(
              (
                tag
              ): tag is NonNullable<typeof tag> & {
                tagByTagId: { name: string }
              } => !!tag && !!tag.tagByTagId
            )
            .map((tag, index) => (
              <div
                key={index}
                className="mt-4 px-4 py-1 dark:text-neutral-800 w-fit rounded-full text-sm bg-blue-700 dark:bg-amber-200 saturate-25 text-neutral-100 dark:text-black"
              >
                {tag.tagByTagId.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EventItem
