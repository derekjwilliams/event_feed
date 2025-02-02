import SuspendedEventsList from '@/components/EventList'

export default function EventsPage() {
  return (
    <main className="p-8 m-2">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <SuspendedEventsList />
    </main>
  )
}
