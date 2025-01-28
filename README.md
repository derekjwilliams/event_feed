# Simple GraphQL Next.js RSS 2.0 Feed

## Great Post on Using feed package to create RSS feeds

https://javascript.plainenglish.io/generate-an-rss-feed-for-your-next-js-website-ce921e2d04c6

The examples on that post were used for much of this code.

## Reeder Application

For viewing the RSS feed, [Reeder](https://reederapp.com/) works great

## Prerequesites

Node version 20.6 or greater

npm version 10.9.0 or greater

## Install

```bash
pnpm install
```

## Build Next Application

```bash
pnpm run build
```

## The GraphQL Server

See https://github.com/derekjwilliams/event_graphql to run the postgraphile server. Live here: https://event-graphql.vercel.app/

## Run the Postgraphile GraphQL Server

> [!WARNING]
> This is deprecated and will be removed soon, see https://github.com/derekjwilliams/event_graphql to run the postgraphile server

```bash
pnpm run postgraphile
```

Serves graphql at http://localhost:3002/graphql

## Run the Mock GraphQL Server

> [!WARNING]
> This is deprecated and will be removed soon, the schema is not correct. See https://github.com/derekjwilliams/event_graphql to run the postgraphile server

```bash
pnpm run gql_server
```

Serves graphql at http://localhost:3001/graphql

## Run the Next.js application

```bash
pnpm run start
```

Runs the Next.js application at http://localhost:3000/graphql

## View the RSS Data

To view all: Open browser to http://localhost:3000/api/rss

### Example Response

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Willamette Events RSS Feed</title>
        <link>http://localhost:3000/api/rss</link>
        <description>Stay updated with the latest events!</description>
        <lastBuildDate>Sun, 19 Jan 2025 20:46:49 GMT</lastBuildDate>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <generator>feed package</generator>
        <language>en</language>
        <copyright>All rights reserved 2025, My RSS Feed</copyright>
        <atom:link href="http://localhost:3000/api/rss" rel="self" type="application/rss+xml"/>
        <item>
            <title><![CDATA[Housing Contract for 2025-26 Opens - All Campuses]]></title>
            <link>http://localhost:3000/events/1</link>
            <guid>http://localhost:3000/events/1</guid>
            <pubDate>Mon, 03 Feb 2025 10:00:00 GMT</pubDate>
            <description><![CDATA[Sign your housing contract to be eligible for housing in the Spring selection process.]]></description>
            <content:encoded><![CDATA[Get a comfy spot to hang your hat...]]></content:encoded>
            <category domain="Willamette-events">Housing</category>
            <category domain="Willamette-events">Willamette</category>
            <category domain="Willamette-events">PNCA</category>
        </item>
        <item>
            <title><![CDATA[Spring Activities Fair and Carnival in the UC]]></title>
            <link>http://localhost:3000/events/2</link>
            <guid>http://localhost:3000/events/2</guid>
            <pubDate>Wed, 15 Jan 2025 12:00:00 GMT</pubDate>
            <description><![CDATA[An introduction to student clubs and organizations as well as the resources available in the University Center.]]></description>
            <content:encoded><![CDATA[Get Involved...]]></content:encoded>
            <category domain="Willamette-events">Putnam</category>
            <category domain="Willamette-events">Salem</category>
            <category domain="Willamette-events">Activities</category>
        </item>
    </channel>
</rss>
```

### Filter by tags

To filter by tags: Open browser to http://localhost:3000/api/rss?tags=PNCA,Housing

## Example GraphQL Query for Mock GraphQL Server

```gql
query ($modifiedSince: String!, $tags: [String!]!) {
  events(modifiedSince: $modifiedSince, tags: $tags) {
    id
    title
    description
    date
    content
  }
}
```

variables:

```json
{ "modifiedSince": "2022-01-15T12:00:00Z", "tags": ["Housing"] }
```

## Example GraphQL Query for Postgraphile GraphQL Server

query {
allEvents {
nodes {
id
title
description
content
pubDate
}
}
}

## Curl Examples To Get Data From RSS Feed

```bash
curl -i http://localhost:3000/api/rss -H "If-Modified-Since: Thu, 02 Jan 2025 12:00:00 GMT"
```

```bash
curl -i http://localhost:3000/api/rss -H "If-None-Match: <etag>"
```

## Create Typescript Types from Database Using Introspection

```bash
npx drizzle-kit introspect
```

# Architecture And Notes

## Canonical Approaches Prefered

While the code may seem daunting at first, it is using canonical approaches, which make it easier to learn if one is already familiar with these. The advantage for novices learning the code is that online resources will have similar patterns and approaches.

### Tanstack React Query Hooks

Tanstack React Query code is contained in custom hooks, that are located in `src/queries`. Another possible location for these would be in `src/hooks`, however the approach that is most common is to place these in the `src/queries` folder. The actual query functions for these hooks are in src/queryFunctions.

#### Example for Tags

In src/queries/tags.ts we have this hook

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

That uses the query function fetchTags, found in src/queryFunctions/tags.ts

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

### Using Generated Types from Graphql Schema

To ensure type safety the code using the types found in which are generated in the [event_graphql](https://github.com/derekjwilliams/event_graphql) project, by running command `pnpm run codegen`. This creates the file src/generated/graphql.ts in that project. That file is used in this project and can be found in src/types. This approach avoids hand writing interfaces and types.

### GraphQL Queries File

The GraphQL queries used by the queryFunctions in `src/queryFunctions` can be found in src/graphql_queries/queries.js

## GraphQL EndPoint, Postgrahile, and Tanstack

This code does not directly use Postgrapile, however it is dependent on a service that does use Postgraphile, that can be found in this repo: https://github.com/derekjwilliams/event_graphql

This is a bit of overhead, and provides little benefit for the feed endpoints (ics, rss, atom, and json1), however it does provide benefits to the client components that use them, e.g. EventList. Since the application, and contained api endpoints, do not mutate Events data the lack of normalized caching in TanStack Query does not have a performance impact. Other libraries, like Apollo, do support normalized caching. However, Apollo historically has not worked well with Next.js.

Other notes on this topic:

- It makes sense to host the graphql api directly in this Next application, however doing so has been problematic, this should be revisted

- Postgraphile 5 brings breaking changes, but many good things. It is still in beta, and has been for a very long time, so the decision was made to stick with Postgraphile 4.14.0 for now.

- [Drizzle-orm](https://www.npmjs.com/package/drizzle-orm) may be a better choice, especially for the api endpoints. Drizzle-orm is widely used, well respected, and well documented. Drizzle-orm has been added to package.json. The generated drizzle types are in `src/types/drizzle/schema.ts` and `src/types/drizzle/relations.ts`, and the `drizzle.config.ts` is in the root of the project.

- https://tanstack.com/query/latest/docs/framework/react/graphql Is a good read

## Some Tricky Bits

Type safety is a very good thing, that being said, TypeScript types can be a challenge to work with and sometimes tooling (like eslint), or even building the project, will catch type errors. It can also be difficult to do some things

### Null Guard Check

You will see code similar to this

````Typescript
tagsData?.nodes
    ?.filter((event): tag is NonNullable<typeof event> => !!tag) // Type guard to filter out null/undefined```
      .map((event) => (....
````

Which is a complex way of checking to see if tag is null like this

```Typescript
.filter((event) => {return event != null})
```

However, TypeScript does not infer the type of event after the filter. This means that if event is of type Maybe<Event> (e.g., Event | null | undefined), the filtered array will still have the type Maybe<Event>[] rather than Event[]. This Maybe<Event> is the type stored in events from the generated types file, see `src/types/graphql.ts`

### Return Values from the fetch Query Functions

In the query function `src/functionQueries/tags.ts` we have `return data?.allTags || null`, this is typesafe because the returned type is `Query['allTags']`. Note, this was not done in `src/functionQueries/events.ts` because of the more complex nature of the type, but it should be done once we grok how to do this.
