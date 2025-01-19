import { Feed } from "feed";



const generateRssFeed = async (posts) => {
  const feed = new Feed({
    title: "My Website's RSS Feed",
    description: "Stay up to date with my latest content",
    id: "http://localhost:3000",
    link: "http://localhost:3000",
    language: "en",
    image: "http://localhost:3000/logo.png",
    favicon: "http://localhost:3000/favicon.png",
    author: {
      name: "John Doe",
      email: "john@example.com",
      link: "http://localhost:3000/about",
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      date: new Date(post.date),
    });
  });

  return feed.rss2();
};

const Rss = () => {};

export async function getServerSideProps({ res }) {
  const posts = [
    {
      title: "Post One",
      description: "This is the first post",
      url: "http://localhost:3000/posts/1",
      date: new Date(),
    },
    {
      title: "Post Two",
      description: "This is the second post",
      url: "http://localhost:3000/posts/2",
      date: new Date(),
    },
    {
      title: "Post Three",
      description: "This is the third post",
      url: "http://localhost:3000/posts/3",
      date: new Date(),
    },
  ];

  const rss = await generateRssFeed(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default Rss;

// import { NextRequest, NextResponse } from 'next/server'
// import { Feed } from 'feed'

// const GRAPHQL_ENDPOINT = 'https://localhost:3001/graphql'

// interface Article {
//   id: string
//   title: string
//   description: string
//   content: string
//   author: string
//   date: Date
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const tags = searchParams.get('tags')?.split(',') || null

//     // Define the GraphQL query
//     const query = `
//       query GetArticles($tags: [String!]) {
//         articles(tags: $tags) {
//           id
//           title
//           description
//           content
//           author
//           date
//         }
//       }
//     `

//     // Fetch articles from the GraphQL endpoint
//     const response = await fetch(GRAPHQL_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables: { tags },
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to fetch articles: ${response.statusText}`)
//     }

//     const { data } = await response.json()

//     if (!data?.articles) {
//       throw new Error('No articles found in the GraphQL response.')
//     }

//     const articlesData = data.articles

//     // Create the RSS feed
//     const feed = new Feed({
//       title: 'My RSS Feed',
//       description: 'Stay updated with the latest articles!',
//       id: 'http://localhost:3000/api/rss',
//       link: 'http://localhost:3000/api/rss',
//       language: 'en',
//       copyright: 'All rights reserved 2025, My RSS Feed',
//       updated: new Date(),
//       generator: 'feed package',
//       feedLinks: {
//         rss: 'http://localhost:3000/api/rss',
//         atom: 'http://localhost:3000/api/rss/atom',
//       },
//     })

//     // Add articles to the feed
//     articlesData.forEach((article: Article) => {
//       feed.addItem({
//         title: article.title,
//         id: `http://localhost:3000/articles/${article.id}`,
//         link: `http://localhost:3000/articles/${article.id}`,
//         description: article.description,
//         content: article.content,
//         author: [{ name: article.author }],
//         date: article.date,
//       })
//     })

//     // Return the RSS feed
//     return new NextResponse(feed.rss2(), {
//       headers: { 'Content-Type': 'application/rss+xml' },
//     })
//   } catch (error) {
//     console.error('Error generating RSS feed:', error);
//     return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 })
//   }
// }
