import { FC } from 'react'

interface Event {
  id: number
  title: string
  description?: string | null
  content?: string | null
  link?: string | null
  author?: string | null
  pubDate?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

interface EventListProps {
  events: Event[]
}

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{event.title}</h2>
          {event.description && (
            <p className="text-gray-600">{event.description}</p>
          )}
          {event.content && <p className="text-gray-800">{event.content}</p>}
          {event.link && (
            <a href={event.link} className="text-blue-500 hover:underline">
              Event Link
            </a>
          )}
          <p className="text-sm text-gray-500">
            Author: {event.author || 'N/A'}
          </p>
          <p className="text-sm text-gray-500">
            Published: {event.pubDate || 'N/A'}
          </p>
          <p className="text-xs text-gray-400">Created At: {event.createdAt}</p>
          <p className="text-xs text-gray-400">Updated At: {event.updatedAt}</p>
        </div>
      ))}
    </div>
  )
}

export default EventList
