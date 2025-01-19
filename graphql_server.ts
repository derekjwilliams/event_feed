import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { makeExecutableSchema } from '@graphql-tools/schema'

// Mock data for articles
const articles = [
  {
    id: '1',
    title: 'GraphQL Introduction',
    description: 'Learn the basics of GraphQL.',
    content: 'GraphQL is a query language for APIs...',
    author: 'John Doe',
    date: '2023-01-01T10:00:00Z',
    tags: ['graphql', 'api', 'intro'],
  },
  {
    id: '2',
    title: 'Advanced GraphQL',
    description: 'Dive deeper into GraphQL.',
    content: 'This article explores advanced topics...',
    author: 'Jane Smith',
    date: '2023-01-15T12:00:00Z',
    tags: ['graphql', 'api', 'advanced'],
  },
];

// GraphQL schema definition
const typeDefs = `
  type Article {
    id: String!
    title: String!
    description: String
    content: String
    author: String
    date: String
    tags: [String]
  }

  type Query {
    articles: [Article]
    article(id: String!): Article
  }
`;
interface ArticleArgs {
  id: string;
}
// Resolvers
const resolvers = {
  Query: {
    articles: () => articles,
    article: (_:unknown, { id }: ArticleArgs) => articles.find((article) => article.id === id),
  },
};

// Create an executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create a Yoga instance with the schema
const yoga = createYoga({ schema });

// Create a Node HTTP server and pass the Yoga instance into it
const server = createServer(yoga);

// Start the server
server.listen(3001, () => {
  console.info('Server is running on http://localhost:3001/graphql');
});
