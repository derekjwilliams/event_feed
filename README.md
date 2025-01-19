# Simple GraphQL Next.js RSS 2.0 Feed

## Install

```bash
pnpm install
```

## Build Next Application

```bash
pnpm run build
```

## Run the Mock GraphQL Server

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

To filter by tags: Open browser to http://localhost:3000/api/rss?tags=PNCA,Housing

