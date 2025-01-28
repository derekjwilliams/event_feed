export interface User {
  id: string
  name: string
  email: string
}

export interface UsersResponse {
  users: {
    nodes: User[]
    pageInfo: {
      hasNextPage: boolean
      currentPage: number
    }
  }
}

// export interface EventsResponse {
//   getEventsByDateAndTags: {
//     pageInfo: {
//       hasNextPage: boolean
//       hasPreviousPage: boolean
//       startCursor?: string
//       endCursor?: string
//     }
//     nodes: Event[]
//   }
// }

// export interface Tag {
//   name: string
// }

// export interface TagsResponse {
//   allTags: {
//     nodes: Tag[]
//   }
// }
