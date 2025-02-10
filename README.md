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

## Download the Calendar (ICS) Data

Open browser to http://localhost:3000/api/ics, this will start a download of the calendar data, it should be about 40kB in size.

## View the RSS Data

Open browser to http://localhost:3000/api/rss

This will show the events in XML RSS format. If it does not show events do a hard refresh on the browser, the feed uses the if-modified-since header to only show events after the date in that header.

### Filtering by Tags

To filter by tags: Open browser to http://localhost:3000/api/rss?tags=PNCA,Housing (alternatively https://event-feed-eta.vercel.app/api/rss?tags=PNCA,Housing)

## Feed Endpoints

When running locally the endpoints will be at

http://localhost:3000/api/rss

http://localhost:3000/api/atom

http://localhost:3000/api/json1

http://localhost:3000/api/ics

http://localhost:3000/api/events

This is used by the other endpoints to get the events and related tags.

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

#### Drizzle

- The generated drizzle types are in `src/db/schema.ts` and `src/db/relations.ts`, and the `drizzle.config.ts` is in the root of the project.

### Some Tricky Bits

Type safety is a very good thing, that being said, Tooling (like eslint), or building the project, catch type errors. If you run into these look at the errors carefully. I've found that LLMs like ChatGPT, Meta AI, and Deepseek can often provide useful suggestions.

#### Typesafe configuration

Using ZOD for typesafe configuration, see the src/env.ts file. This video has a decent description. https://youtu.be/sNh9PoM9sUE?si=HUEVx-uGDbYofWnb&t=1530
