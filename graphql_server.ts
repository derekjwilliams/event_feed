import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { makeExecutableSchema } from '@graphql-tools/schema'

const events = [
  {
    id: '1',
    title: 'Housing Contract for 2025-26 Opens - All Campuses',
    description: 'Sign your housing contract to be eligible for housing in the Spring selection process.',
    content: 'Get a comfy spot to hang your hat...',
    author: 'Events Calendar',
    date: '2025-02-03T10:00:00Z',
    tags: ['Housing','Willamette','PNCA'],
  },
  {
    id: '2',
    title: 'Spring Activities Fair and Carnival in the UC',
    description: 'An introduction to student clubs and organizations as well as the resources available in the University Center.',
    content: 'Get Involved...',
    author: 'Jane Smith',
    date: '2025-01-15T12:00:00Z',
    tags: ['Putnam', 'Salem', 'Activities'],
  },
]

const typeDefs = `
  type Event {
    id: String!
    title: String!
    description: String
    content: String
    author: String
    date: String
    tags: [String]
  }

  type Query {
    events(tags: [String], modifiedSince: String): [Event]
    event(id: String!): Event
  }
`

interface EventArgs {
  id: string;
}
interface EventsArgs {
  tags?: string[]
  modifiedSince?: string
}
const resolvers = {
  Query: {
    events: (_: unknown, { tags, modifiedSince }: EventsArgs) => {
      let filteredEvents = events
      if (tags && tags.length > 0) {
        filteredEvents = filteredEvents.filter(event =>
          tags.every(tag => event.tags.includes(tag))
        )
      }

      if (modifiedSince) {
        const modifiedSinceDate = new Date(modifiedSince)
        filteredEvents = filteredEvents.filter(
          event => new Date(event.date) > modifiedSinceDate
        )
      }

      return filteredEvents
    },
    event: (_: unknown, { id }: EventArgs) =>
      events.find((event) => event.id === id),
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })
const yoga = createYoga({ schema })
const server = createServer(yoga)

server.listen(3001, () => {
  console.info('Server is running on http://localhost:3001/graphql')
})

