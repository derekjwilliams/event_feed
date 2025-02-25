// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Event: a.customType({
    id: a.id().required(),
    title: a.string().required(),
    description: a.string(),
    content: a.string(),
    link: a.string(),
    author: a.string(),
    pubDate: a.datetime(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    imageUrl: a.string(),
    location: a.string(),
    eventEndDate: a.datetime(),
    eventStartDate: a.datetime(),
    tags: a.hasMany('Tag'),
  }),

  Tag: a.customType({
    id: a.id().required(),
    name: a.string().required(),
    events: a.hasMany('Event'),
  }),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})

// Configure custom resolvers in Amplify 2
// You'll need to place your resolver files in the right location
// typically amplify/data/custom/resolvers/Query.getEvent.ts, etc.
