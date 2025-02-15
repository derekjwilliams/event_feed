# Simple Events Application and Feed APIs

This is a simple Next.js application to view events. Endpoints are also provided for RSS2, ICS, JSON1, and ATOM feeds.

If you want to skip this and read about the architecture, see [Architecture Techstack And Notes](#architecture-techstack-and-notes)

## Prerequesites

Node version 20.18.0 or greater

pnpm version 9.15.4 or greater

### Installing pnpm If You Don't Have It

```bash
npm install -g pnpm@latest-10
```

See here https://pnpm.io/installation#using-npm. Other installation methods are also fine.

### npm

npm will also work, but you will adjust the directions accordingly (e.g. `npm install` instead of `pnpm install`)

If you use npm, version 10.9.2 or greater is required.

## Installing

To install the packages

```bash
pnpm install
```

## Run the Application in Development Mode

```bash
pnpm run dev
```

## Build and Start the Application

To build

```bash
pnpm run build
```

You can then start with

```bash
pnpm run build
```

## View the Events

After starting the application (`pnpm run dev` or `pnpm run start`) navigate to http://localhost:3000/events to see a user interface showing the events. A preview version may be running on Vercel at https://event-feed-eta.vercel.app/events. The user interface includes the ability to filter by tags, shown at the top, and pagination, at the bottom of the user interface. And add events to your calendar.

![Image](https://github.com/user-attachments/assets/39ac0b53-01d1-4a26-a9b0-3c60d565ba9b)

## The GraphQL Server

The application gets its data from this endpoint

https://event-graphql.vercel.app/graphql

The GraphiQL user interface can be seen here: https://event-graphql.vercel.app/graphiql

See [Example Query](#example-graphql-query)

## Download the Calendar (ICS) Data

Open browser to http://localhost:3000/api/ics, this will start a download of the calendar data, it should be about 40kB in size. Use an incognito window to get a complete calendar; this is becasue the ics endpoint examines the `if-modified-since` and `if-none-match` headers to determine which events to return.

### cURL for Full Calendar from ICS endpoint

```bash
curl 'http://localhost:3000/api/ics' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"'
```

## View the RSS Data

Open browser to http://localhost:3000/api/rss

This will show the events in XML RSS format. If it does not show events do a hard refresh on the browser, the feed uses the if-modified-since header to only show events after the date in that header.

### Filtering by Tags

To filter by tags: Open browser to http://localhost:3000/api/rss?tags=PNCA,Housing (alternatively https://event-feed-eta.vercel.app/api/rss?tags=PNCA,Housing)

## GraphiQL User Interface

For the GraphQL Server. A GraphiQL user interface is running at https://event-graphql.vercel.app/graphiql

### Example GraphQL Query

Place this query into the main query pane, don't forget to add the variables in the QUERY VARIABLES pane, get those [here](#query-variables). You should have something similar to [this](#graqhiql-user-interface-image) in your browser.

```gql
query getEventsByDateAndTags(
  $pubDate: String!
  $tagNames: [String!]!
  $first: Int
  $after: Cursor
) {
  getEventsByDateAndTags(
    pPubDate: $pubDate
    pTagNames: $tagNames
    first: $first
    after: $after
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }

    nodes {
      id
      author
      title
      description
      content
      link
      pubDate
      createdAt
      updatedAt
      imageUrl
      eventStartDate
      eventEndDate
      eventTagsByEventId {
        nodes {
          tagByTagId {
            name
          }
        }
      }
    }
  }
}
```

### Query Variables

```json
{
  "pubDate": "2017-01-01",
  "tagNames": ["Housing"],
  "first": 1,
  "after": "WyJuYXR1cmFsIiwxXQ=="
}
```

### GraqhiQL User Interface Image

![Image](https://github.com/user-attachments/assets/a9d5b333-6a20-4168-b38b-689b4efc7b69)

## Feed Endpoints

When running locally the endpoints will be at

http://localhost:3000/api/rss

http://localhost:3000/api/atom

http://localhost:3000/api/json1

http://localhost:3000/api/ics

### Curl Examples To Get Data From RSS Feed

```bash
curl -i http://localhost:3000/api/rss -H "If-Modified-Since: Thu, 02 Jan 2025 12:00:00 GMT"
```

```bash
curl -i http://localhost:3000/api/rss -H "If-None-Match: <etag>"
```

### Great Post on Using feed package to create RSS feeds

https://javascript.plainenglish.io/generate-an-rss-feed-for-your-next-js-website-ce921e2d04c6

The examples on that post were used for much of this code.

### Reeder Application

For viewing the RSS, Atom, and JSON1 feeds, [Reeder](https://reederapp.com/) works great.

## Architecture, Techstack, And Notes

### Canonical Approaches Preferred

While the code may seem daunting at first, it is using canonical approaches, which make it easier to learn if one is already familiar with these. The advantage for novices learning the code is that online resources will have similar patterns and approaches.

#### TanStack Query Hooks

The TanStack Query code is contained in custom hooks, these are located in `src/queries`. The actual query functions for these hooks are in `src/queryFunctions`.

Another possible location for these would be in `src/hooks`, however the approach that is most common is to place these in the `src/queries` folder.

#### Example for Tags

In `src/queries/tags.ts` we have this hook

```Typescript
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchTags } from '@/queryFunctions/tags'
import { Query } from '@/types/graphql'

const useTagsQuery = (): UseQueryResult<Query['allTags']> => {
  const queryResult = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })

  return queryResult
}

export default useTagsQuery
```

That uses the query function `fetchTags`, found in `src/queryFunctions/tags.ts`

```Typescript
import { TAGS_QUERY } from '@/graphql_queries/queries'
import { Query } from '@/types/graphql'

export async function fetchTags(): Promise<Query['allTags']> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'https://event-graphql.vercel.app/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: TAGS_QUERY,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }
  const { data, errors }: { data: Query; errors?: { message: string }[] } =
    await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
  return data?.allTags || null
}
```

#### Using Generated Types from Graphql Schema

To ensure type safety the code using the types found in which are generated in the [event_graphql](https://github.com/derekjwilliams/event_graphql) project, by running command `pnpm run codegen`. This creates the file src/generated/graphql.ts in that project. That file is used in this project and can be found in src/types. This approach avoids hand writing interfaces and types.

#### GraphQL Queries File

The GraphQL queries used by the queryFunctions in `src/queryFunctions` can be found in src/graphql_queries/queries.js

### GraphQL Service

This code uses Hasura cloud service to obtain event data.

The `package.json` file contains scripts to download the schema from the GraphQL endpoint, e.g. Hasura, and to generate the typescript types

#### Download the Schema

```bash
pnpm graphql_schema
```

This generates the file `./src/generated/graphql-schema.graphql`.

#### Generate the Types

```bash
pnpm codegen
```

This generates the file `./src/generated/graphql.ts` which contains the typescript definitions. This uses the codegen.ts file to specify what graphql plugins to use, e.g.

```TypeScript
plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-query',
      ],
```

#### Download the Schema then Generate the Types

To do both (download schema then generate the types):

```bash
pnpm generate
```

### Some Tricky Bits

Type safety is a very good thing, that being said, Tooling (like eslint), or building the project, catch type errors. If you run into these look at the errors carefully. I've found that LLMs like ChatGPT, Meta AI, and Deepseek can often provide useful suggestions.

#### Null Guard Check

You will see code similar to this

```Typescript
{(eventsData?.nodes || [])
        .filter((event): event is NonNullable<typeof event> => event !== null)
        .map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
```

Which may seem to be a complex way of checking to see if tag is event is null like this:

```Typescript
.filter((event) => {return event != null})
```

However, TypeScript does not infer the type of event after the filter. This means that if event is of type `Maybe<Event>` (e.g., `Event | null | undefined`), the filtered array will still have the type `Maybe<Event>[]` rather than `Event[]`. This `Maybe<Event>` is the type stored in events from the generated types file, see `src/types/graphql.ts`. Yep, complex.

#### Return Values from the fetch Query Functions

In the query function in `src/functionQueries/tags.ts` we have `return data?.allTags || null`, this is typesafe because the returned type is `Query['allTags']`. Note, this was not done in `src/functionQueries/events.ts` because of the more complex nature of the type, but it should be revisited.
