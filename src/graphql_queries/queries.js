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
        imageUrl
        eventStartDate
        eventEndDate
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

export const TAGS_QUERY = `
  query {
    allTags {
      nodes {
        name
      }
    }
  }
`
