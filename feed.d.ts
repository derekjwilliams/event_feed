declare module 'feed' {
  interface FeedOptions {
    title: string;
    description: string;
    link: string;
    favicon: string;
  }

  interface FeedItem {
    title: string;
    description: string;
    link: string;
    pubDate: Date;
  }

  function feed(options: FeedOptions, items: FeedItem[]): {
    rss2(): string;
  };

  export default feed;
}