import SuspendedEventsList from '@/components/EventList'

export default function EventsPage() {
  return (
    <main className="w-full max-w-[90%] mx-8 px-2 py-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <SuspendedEventsList />
    </main>
  )
}
