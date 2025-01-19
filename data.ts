export const posts: Post[] = [
  {
    title: 'Post 1',
    description: 'This is the first post.',
    link: 'https://example.com/post1',
    pubDate: new Date('2022-01-01T00:00:00.000Z'),
  },
  {
    title: 'Post 2',
    description: 'This is the second post.',
    link: 'https://example.com/post2',
    pubDate: new Date('2022-01-15T00:00:00.000Z'),
  },
  {
    title: 'Post 3',
    description: 'This is the third post.',
    link: 'https://example.com/post3',
    pubDate: new Date('2022-02-01T00:00:00.000Z'),
  },
];

interface Post {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
}