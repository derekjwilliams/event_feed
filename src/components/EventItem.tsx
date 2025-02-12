// Event.tsx
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { Events } from '@/types/graphql'
import Link from 'next/link'

const EventItem: React.FC<{ event: Events }> = ({ event }) => {
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

  // const baseUrl =
  //   process.env.NEXT_PUBLIC_BASE_URL || 'https://events.willamette.edu'

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
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <div className="float-right">
            {event.geoLocation && (
              <Link
                target="_blank"
                className="float-left"
                href={`https://www.google.com/maps/search/?api=1&query=${event.geoLocation?.coordinates[1]},${event.geoLocation?.coordinates[0]}`}
              >
                <MapPin className="text-neutral-500 dark:text-neutral-200 saturate-25" />
              </Link>
            )}
            <Calendar className="text-neutral-500 dark:text-neutral-200 saturate-25" />
          </div>
          <h2 className="text-xl font-semibold">
            {event?.link ? (
              <a
                href={
                  (event?.baseUrl?.endsWith('/')
                    ? event.baseUrl.slice(0, -1)
                    : event.baseUrl) + event.link
                }
              >
                {event.title}
              </a>
            ) : (
              <span>{event.title}</span>
            )}
          </h2>
          <div className="flex">
            {event.eventStartDate && (
              <div className="text-md font-semibold text-neutral-600 dark:text-neutral-200">
                {new Date(event.eventStartDate ?? '').toDateString()}
              </div>
            )}
            {eventStartTimeString !== eventEndTimeString && (
              <div className="mx-4 text-md text-neutral-600 dark:text-neutral-200">
                <span>
                  {eventStartTimeString} - {eventEndTimeString}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {event.location && (
          <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
            {event.location}
          </h3>
        )}
        <p className="max-h-[240px] overflow-auto p-2 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
          {event.description}
        </p>
        {/* {event.content && (
          <div className="max-h-[240px] overflow-auto p-2 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
            {event.content}
          </div>
        )} */}
        {(event.eventTags.length === 1 && event.eventTags[0].tag.name !== '') ||
          (event.eventTags.length >= 2 && (
            <div className="mt-2 flex gap-2">
              {event.eventTags
                .filter(
                  (
                    eventTag
                  ): eventTag is NonNullable<typeof eventTag> & {
                    tagByTagId: { name: string }
                  } => !!eventTag && eventTag.tag.name !== ''
                )
                .map((eventTag) => (
                  <div
                    key={event.id}
                    className="mt-4 px-4 py-1 dark:text-neutral-800 w-fit rounded-full text-sm bg-blue-700 dark:bg-amber-200 saturate-25 text-neutral-100 dark:text-black"
                  >
                    {eventTag.tag.name}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default EventItem
