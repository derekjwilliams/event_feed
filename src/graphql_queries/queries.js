export const EVENTS_QUERY = `
  query getEventsByDateAndTags($pubDate: String!, $tagNames: [String!]!) {
    getEventsByDateAndTags(pPubDate: $pubDate, pTagNames: $tagNames) {
      nodes {
        id
        author
        title
        description
        content
        link
        pubDate
        createdAt
        updatedAt
        eventTagsByEventId {
          nodes {
            tagByTagId {
              name
            }
          }
        }
      }
    }
  }`
