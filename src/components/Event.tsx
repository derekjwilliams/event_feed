// Event.tsx
import Image from 'next/image'

interface EventProps {
  event: {
    id: string
    title: string
    link?: string
    imageUrl?: string
    eventStartDate: string
    description: string
    eventTagsByEventId: {
      nodes: {
        tagByTagId: {
          name: string
        }
      }[]
    }
    content?: string
  }
}

const Event: React.FC<EventProps> = ({ event }) => {
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
          <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
            {new Date(event.eventStartDate).toDateString()}
          </h3>
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

export default Event
