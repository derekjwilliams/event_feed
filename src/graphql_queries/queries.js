export const EVENTS_QUERY = `
  query getEventsByDateAndTags($pubDate: String!
    $tagNames: [String!]!
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor) {
    getEventsByDateAndTags(
      pPubDate: $pubDate
      pTagNames: $tagNames
      first: $first
      after: $after
      last: $last
      before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      } 
      nodes {
        id
        author
        title
        description
        geoLocation {
          longitude
          latitude
        }
        content
        link
        pubDate
        createdAt
        updatedAt
        imageUrl
        eventStartDate
        eventEndDate
        location
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
