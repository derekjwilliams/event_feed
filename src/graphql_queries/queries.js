export const EVENTS_QUERY = `
  query getEventsByDateAndTags($tagNames: _text, $pubDate: String!) {
  getEventsByDateAndTags(
    limit: 10
    args: {
      p_tag_names: $tagNames,
      p_pub_date: $pubDate
    }
  ) {
    title
    description
    eventStartDate
    eventEndDate
    location
    geoLocation
    eventTagsAsString
    eventTags {
      tag {
        name
      }
    }
  }
}`

export const TAGS_QUERY = `
  query {
  allTags (filter: {name : {notEqualTo: ""}} orderBy:NAME_ASC) {
    nodes {
      name
    }
  }
}
`
