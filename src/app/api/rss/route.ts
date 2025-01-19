// app/api/rss/route.ts
import { NextResponse } from "next/server";
import { Feed } from "feed";
import { articles } from "../../../../data/articles";

export async function GET() {
  const feed = new Feed({
    title: "My RSS Feed",
    description: "This is a sample RSS feed",
    id: "http://localhost:3000/",
    link: "http://localhost:3000/",
    language: "en",
    image: "http://localhost:3000/favicon.ico",
    favicon: "http://localhost:3000/favicon.ico",
    updated: new Date(),
    generator: "Next.js",
    copyright: "2025"
  });

  articles.forEach((article) => {
    feed.addItem({
      title: article.title,
      link: article.url,
      description: article.description,
      date: article.date,
    });
  });

  // Return the RSS feed as XML
  return NextResponse.json(feed.rss2(), { headers: { "Content-Type": "application/rss+xml" } });
}
