import { EventItems } from '@/components/EventItems'
import { EventLayout } from '@/components/EventLayout'
import SuspendedEventsList from '@/components/EventsList'
import { Options } from '@/components/Options'

export default function EventsPage() {
  return (
    <main className="p-2 m-2">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <SuspendedEventsList />
    </main>
  )
}
