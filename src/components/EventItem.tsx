import { EventWithTags } from '@/app/events/eventTypes'
import Image from 'next/image'
export default function EventItem({ event, tags }: EventWithTags) {
  const eventTimeZone = 'America/Los_Angeles' // Event's time zone

  const eventStartTimeString = event.eventStartDate
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: eventTimeZone, // Forces display in event's local time
        hour12: true, // Ensures 12-hour format
      }).format(new Date(event.eventStartDate))
    : ''

  const eventEndTimeString = event.eventEndDate
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: eventTimeZone, // Forces display in event's local time
        hour12: true, // Ensures 12-hour format
      }).format(new Date(event.eventEndDate))
    : ''

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
          {event.content && (
            <p className="p-3 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
              {event.description}
            </p>
          )}
          <div className="mt-2 flex gap-2">
            {tags
              .filter((tag) => tag !== '')
              .map((tag, index) => (
                <span
                  key={index}
                  className="mt-4 px-4 py-1 dark:text-neutral-800 w-fit rounded-full text-sm bg-blue-700 dark:bg-amber-200 saturate-25 text-neutral-100 dark:text-black"
                >
                  {tag}
                </span>
              ))}
          </div>
          {/* {event.content && (
            <div className="p-3 rounded mt-4 bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300">
              {event.content}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
