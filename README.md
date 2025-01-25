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

## Run the Postgraphile GraphQL Server

This is deprecated, see https://github.com/derekjwilliams/event_graphql to run the postgraphile server

```bash
pnpm run postgraphile
```

Serves graphql at http://localhost:3002/graphql

## Run the Mock GraphQL Server

This is deprecated, the schema is not correct. See https://github.com/derekjwilliams/event_graphql to run the postgraphile server

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
