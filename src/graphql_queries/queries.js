export const EVENTS_QUERY = `

query GetEventsByDateAndTags($tagNames: _text, $pubDate: String!) {
  getEventsByDateAndTags_connection(
    first: 10
    orderBy: {eventStartDate: ASC}
    args: {p_tag_names: $tagNames, p_pub_date: $pubDate}
  ) {
    edges {
      node {
        title
        description
        eventStartDate
        eventEndDate
        location
        geoLocation
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

// {
//   "tagNames": "{Salem Campus}", // YES THIS IS WEIRD, hasura has a _text type here, not a [String] which is what Postgrapile uses, see https://www.postgresql.org/docs/current/arrays.html#ARRAYS-INPUT
//   "pubDate": "2017-01-01"
// }

// For tags with empty string: ''
// {
//   "tagNames": "{ \"\" }",
//   "pubDate": "2017-01-01"
// }

export const TAGS_QUERY = `
  query {
  allTags (filter: {name : {notEqualTo: ""}} orderBy:NAME_ASC) {
    nodes {
      name
    }
  }
}
`
