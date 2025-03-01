// EventItem.tsx
import { Calendar } from 'lucide-react'
import { Events } from '@/types/graphql'
import MapLink from './ui/MapLink'
import EventCalendarLink from './ui/EventCalendarLink'
import LazyImage from './ui/LazyImage'
import { EventDateAndTime } from './EventDateAndTime'
import { Key } from 'react'

const EventItem: React.FC<{ event: Events }> = ({ event }) => {
  const locationLatitude = event.geoLocation?.coordinates[1]
  const locationLongitude = event.geoLocation?.coordinates[0]

  return (
    <div
      key={event.id}
      className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
    >
      <div className="@container flex gap-4">
        {event.imageUrl && (
          <LazyImage
            src={event.imageUrl}
            alt={event.title}
            width={192}
            height={192}
            className="w-32 h-32 @[480px]:w-48 @[480px]:h-48 object-cover rounded"
            sizes="192px, 128px"
          />
        )}
        <div className="flex-1">
          <div className="float-right">
            {locationLatitude !== undefined &&
              locationLongitude !== undefined && (
                <MapLink
                  target="_blank"
                  className="float-left"
                  latitude={locationLatitude}
                  longitude={locationLongitude}
                  label={event.location ?? ''}
                ></MapLink>
              )}
            <EventCalendarLink
              uid={`${process.env.NEXT_PUBLIC_ICS_UID}${event.link}`}
              start={event.eventStartDate}
              end={event.eventStartDate}
              categories={
                event.eventTagsAsString
                  ? event.eventTagsAsString.split('|')
                  : []
              }
              summary={event.title}
              description={event.description ? event.description : ''}
              url={event.link ? event.link : ''}
              location={event.location ? event.location : ''}
            >
              <Calendar className="text-neutral-500 dark:text-neutral-200 saturate-25" />
            </EventCalendarLink>
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
          <EventDateAndTime
            startDate={new Date(event.eventStartDate)}
            endDate={new Date(event.eventEndDate)}
            timeZone={event.eventTimeZone}
          />{' '}
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
        {(event.eventTagsAsString?.split('|').length === 1 &&
          event.eventTagsAsString?.split('|')[0] !== '') ||
          (event.eventTagsAsString &&
            event.eventTagsAsString.split('|')?.length >= 2 && (
              <div className="mt-2 flex gap-2">
                {event.eventTagsAsString
                  ?.split('|')
                  .filter((tagname: string) => tagname !== '')
                  .map((tagname: string, index: Key) => (
                    <div
                      key={index}
                      className="mt-4 px-4 py-1 dark:text-neutral-800 w-fit rounded-full text-sm bg-blue-700 dark:bg-amber-200 saturate-25 text-neutral-100"
                    >
                      {tagname}
                    </div>
                  ))}
              </div>
            ))}
      </div>
    </div>
  )
}

export default EventItem
