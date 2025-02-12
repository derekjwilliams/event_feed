export const EVENTS_QUERY = `
query GetEventsByDateAndTags($tagNames: _text, $pubDate: String!, $first:Int, $last:Int, $after:String, $before:String) @cached(ttl: 300) {
  getEventsByDateAndTags_connection(
    first: $first
    after: $after
    last: $last
    before: $before
    orderBy: {eventStartDate: ASC}
    args: {p_tag_names: $tagNames, p_pub_date: $pubDate}
  ) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        description
        eventStartDate
        eventEndDate
        imageUrl
        location
        geoLocation
        pubDate
        eventTagsAsString
        eventTags {
          tag {
            name
          }
        }
      }
    }
  }
}
`
// Query variables exmample:
// {
//   "tagNames": "{Salem Campus}", // YES THIS IS WEIRD, hasura has a _text type here, not a [String] which is what Postgrapile uses, see https://www.postgresql.org/docs/current/arrays.html#ARRAYS-INPUT
//   "pubDate": "2017-01-01"
// }

// For tags with empty string: ''
// {
//   "tagNames": "{ \"\" }",
//   "pubDate": "2017-01-01"
// }

// {
//   "tagNames": "{ \"\" }",
//   "pubDate": "2017-01-01",
//   "first": 8
// }

export const TAGS_QUERY = `
query @cached(ttl: 300) {
  tagsConnection {
    edges {
      node {
        id
        name
      }
    }
  }
}
`
