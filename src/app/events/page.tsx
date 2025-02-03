'use server'

import { getAllTags, getEventsWithTags } from './actions' // Server action

import EventsList from '@/components/DrizzleEventList' // Client-side component

export default async function EventsPage() {
  const date = new Date(0).toISOString() // Example date
  const tagNames = ['Other', 'PNCA Campus'] // Example tags TODO empty array here
  const defaultNumberOfEvents = 2 // TODO limit
  // Fetch initial data on the server
  const { result, nextCursor } = await getEventsWithTags(
    tagNames,
    date,
    defaultNumberOfEvents
  )
  const allTags = await getAllTags()
  console.log('RESULT: ', allTags)

  return (
    <div>
      <h1>Events, I am on the server</h1>
      {/* <div>{`${JSON.stringify(result)}`}</div> */}

      {/* Filter or static content can go here */}

      {/* Pass fetched data to the client-side component */}
      <EventsList
        allTagNames={allTags.map((tag) => tag.name)}
        initialEvents={result}
        initialTags={[]}
        nextCursor={nextCursor}
      />
    </div>
  )
}
