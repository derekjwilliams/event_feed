import feed from 'feed';
import { posts } from '../../../data';

const feedOptions = {
  title: 'My RSS Feed',
  description: 'A brief description of my RSS feed.',
  link: 'https://example.com/rss',
  favicon: 'https://example.com/favicon.ico',
};

const feedItems = posts.map((post) => ({
  title: post.title,
  description: post.description,
  link: post.link,
  pubDate: post.pubDate,
}));

const rssFeed = feed(feedOptions, feedItems);

export async function GET() {
  const rssFeedString = rssFeed.rss2();

  return new Response(rssFeedString, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}