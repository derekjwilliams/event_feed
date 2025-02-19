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
      edges { 
        node {
          id
          author
          title
          description
          geoLocation {
            longitude
            latitude
          }
          baseUrl
          content
          link
          pubDate
          createdAt
          updatedAt
          imageUrl
          eventStartDate
          eventEndDate
          location
          tagsString
        }
      }
    }
  }`

export const TAGS_QUERY = `
  query {
  allTags (filter: {name : {notEqualTo: ""}} orderBy:NAME_ASC) {
    edges {
      node {
        name
      }
    }
  }
}
`
