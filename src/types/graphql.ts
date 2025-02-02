/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any }
  /** The `GeoJSON` scalar type represents GeoJSON values as specified by[RFC 7946](https://tools.ietf.org/html/rfc7946). */
  GeoJSON: { input: any; output: any }
}

/** All input for the create `Event` mutation. */
export type CreateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Event` to be created by this mutation. */
  event: EventInput
}

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Event` that was created by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Event` mutation. */
export type CreateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the create `EventTag` mutation. */
export type CreateEventTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventTag` to be created by this mutation. */
  eventTag: EventTagInput
}

/** The output of our create `EventTag` mutation. */
export type CreateEventTagPayload = {
  __typename?: 'CreateEventTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventTag`. */
  eventByEventId?: Maybe<Event>
  /** The `EventTag` that was created by this mutation. */
  eventTag?: Maybe<EventTag>
  /** An edge for our `EventTag`. May be used by Relay 1. */
  eventTagEdge?: Maybe<EventTagsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Tag` that is related to this `EventTag`. */
  tagByTagId?: Maybe<Tag>
}

/** The output of our create `EventTag` mutation. */
export type CreateEventTagPayloadEventTagEdgeArgs = {
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Tag` to be created by this mutation. */
  tag: TagInput
}

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>
}

/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: InputMaybe<Array<TagsOrderBy>>
}

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>
}

/** All input for the `deleteEventById` mutation. */
export type DeleteEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** All input for the `deleteEvent` mutation. */
export type DeleteEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventId?: Maybe<Scalars['ID']['output']>
  /** The `Event` that was deleted by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Event` mutation. */
export type DeleteEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the `deleteEventTagByEventIdAndTagId` mutation. */
export type DeleteEventTagByEventIdAndTagIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  eventId: Scalars['Int']['input']
  tagId: Scalars['Int']['input']
}

/** All input for the `deleteEventTag` mutation. */
export type DeleteEventTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventTag` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventTag` mutation. */
export type DeleteEventTagPayload = {
  __typename?: 'DeleteEventTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventTagId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `EventTag`. */
  eventByEventId?: Maybe<Event>
  /** The `EventTag` that was deleted by this mutation. */
  eventTag?: Maybe<EventTag>
  /** An edge for our `EventTag`. May be used by Relay 1. */
  eventTagEdge?: Maybe<EventTagsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Tag` that is related to this `EventTag`. */
  tagByTagId?: Maybe<Tag>
}

/** The output of our delete `EventTag` mutation. */
export type DeleteEventTagPayloadEventTagEdgeArgs = {
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** All input for the `deleteTagById` mutation. */
export type DeleteTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** All input for the `deleteTagByName` mutation. */
export type DeleteTagByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Tag` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedTagId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>
}

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: InputMaybe<Array<TagsOrderBy>>
}

export type Event = Node & {
  __typename?: 'Event'
  author?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['Datetime']['output']>
  description?: Maybe<Scalars['String']['output']>
  eventEndDate?: Maybe<Scalars['Datetime']['output']>
  eventStartDate?: Maybe<Scalars['Datetime']['output']>
  /** Reads and enables pagination through a set of `EventTag`. */
  eventTagsByEventId: EventTagsConnection
  geoLocation?: Maybe<GeographyPoint>
  id: Scalars['Int']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  link?: Maybe<Scalars['String']['output']>
  location?: Maybe<Scalars['String']['output']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  pubDate?: Maybe<Scalars['Datetime']['output']>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['Datetime']['output']>
}

export type EventEventTagsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventTagCondition>
  filter?: InputMaybe<EventTagFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `author` field. */
  author?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `content` field. */
  content?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventEndDate` field. */
  eventEndDate?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `eventStartDate` field. */
  eventStartDate?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `geoLocation` field. */
  geoLocation?: InputMaybe<Scalars['GeoJSON']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `imageUrl` field. */
  imageUrl?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `link` field. */
  link?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `location` field. */
  location?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `pubDate` field. */
  pubDate?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

/** A filter to be used against `Event` object types. All fields are combined with a logical ‘and.’ */
export type EventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventFilter>>
  /** Filter by the object’s `author` field. */
  author?: InputMaybe<StringFilter>
  /** Filter by the object’s `content` field. */
  content?: InputMaybe<StringFilter>
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>
  /** Filter by the object’s `eventEndDate` field. */
  eventEndDate?: InputMaybe<DatetimeFilter>
  /** Filter by the object’s `eventStartDate` field. */
  eventStartDate?: InputMaybe<DatetimeFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `imageUrl` field. */
  imageUrl?: InputMaybe<StringFilter>
  /** Filter by the object’s `link` field. */
  link?: InputMaybe<StringFilter>
  /** Filter by the object’s `location` field. */
  location?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<EventFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventFilter>>
  /** Filter by the object’s `pubDate` field. */
  pubDate?: InputMaybe<DatetimeFilter>
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>
}

/** An input for mutations affecting `Event` */
export type EventInput = {
  author?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  eventEndDate?: InputMaybe<Scalars['Datetime']['input']>
  eventStartDate?: InputMaybe<Scalars['Datetime']['input']>
  geoLocation?: InputMaybe<Scalars['GeoJSON']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  pubDate?: InputMaybe<Scalars['Datetime']['input']>
  title: Scalars['String']['input']
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  author?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  eventEndDate?: InputMaybe<Scalars['Datetime']['input']>
  eventStartDate?: InputMaybe<Scalars['Datetime']['input']>
  geoLocation?: InputMaybe<Scalars['GeoJSON']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  pubDate?: InputMaybe<Scalars['Datetime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type EventTag = Node & {
  __typename?: 'EventTag'
  /** Reads a single `Event` that is related to this `EventTag`. */
  eventByEventId?: Maybe<Event>
  eventId: Scalars['Int']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `Tag` that is related to this `EventTag`. */
  tagByTagId?: Maybe<Tag>
  tagId: Scalars['Int']['output']
}

/**
 * A condition to be used against `EventTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventTagCondition = {
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `EventTag` object types. All fields are combined with a logical ‘and.’ */
export type EventTagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventTagFilter>>
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<IntFilter>
  /** Negates the expression. */
  not?: InputMaybe<EventTagFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventTagFilter>>
  /** Filter by the object’s `tagId` field. */
  tagId?: InputMaybe<IntFilter>
}

/** An input for mutations affecting `EventTag` */
export type EventTagInput = {
  eventId: Scalars['Int']['input']
  tagId: Scalars['Int']['input']
}

/** Represents an update to a `EventTag`. Fields that are set will be updated. */
export type EventTagPatch = {
  eventId?: InputMaybe<Scalars['Int']['input']>
  tagId?: InputMaybe<Scalars['Int']['input']>
}

/** A connection to a list of `EventTag` values. */
export type EventTagsConnection = {
  __typename?: 'EventTagsConnection'
  /** A list of edges which contains the `EventTag` and cursor to aid in pagination. */
  edges: Array<EventTagsEdge>
  /** A list of `EventTag` objects. */
  nodes: Array<Maybe<EventTag>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventTag` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventTag` edge in the connection. */
export type EventTagsEdge = {
  __typename?: 'EventTagsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventTag` at the end of the edge. */
  node?: Maybe<EventTag>
}

/** Methods to use when ordering `EventTag`. */
export enum EventTagsOrderBy {
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TagIdAsc = 'TAG_ID_ASC',
  TagIdDesc = 'TAG_ID_DESC',
}

/** A connection to a list of `Event` values. */
export type EventsConnection = {
  __typename?: 'EventsConnection'
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  edges: Array<EventsEdge>
  /** A list of `Event` objects. */
  nodes: Array<Maybe<Event>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Event` at the end of the edge. */
  node?: Maybe<Event>
}

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  AuthorAsc = 'AUTHOR_ASC',
  AuthorDesc = 'AUTHOR_DESC',
  ContentAsc = 'CONTENT_ASC',
  ContentDesc = 'CONTENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EventEndDateAsc = 'EVENT_END_DATE_ASC',
  EventEndDateDesc = 'EVENT_END_DATE_DESC',
  EventStartDateAsc = 'EVENT_START_DATE_ASC',
  EventStartDateDesc = 'EVENT_START_DATE_DESC',
  GeoLocationAsc = 'GEO_LOCATION_ASC',
  GeoLocationDesc = 'GEO_LOCATION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ImageUrlAsc = 'IMAGE_URL_ASC',
  ImageUrlDesc = 'IMAGE_URL_DESC',
  LinkAsc = 'LINK_ASC',
  LinkDesc = 'LINK_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PubDateAsc = 'PUB_DATE_ASC',
  PubDateDesc = 'PUB_DATE_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
}

/** All geography XY types implement this interface */
export type GeographyGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

/** All geography types implement this interface */
export type GeographyInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

export type GeographyPoint = GeographyGeometry &
  GeographyInterface & {
    __typename?: 'GeographyPoint'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    latitude: Scalars['Float']['output']
    longitude: Scalars['Float']['output']
    srid: Scalars['Int']['output']
  }

/** All geometry XY types implement this interface */
export type GeometryGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

export type GeometryGeometryCollection = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryGeometryCollection'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    geometries?: Maybe<Array<Maybe<GeometryGeometry>>>
    srid: Scalars['Int']['output']
  }

export type GeometryGeometryCollectionM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryGeometryCollectionM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    geometries?: Maybe<Array<Maybe<GeometryGeometryM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryGeometryCollectionZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryGeometryCollectionZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    geometries?: Maybe<Array<Maybe<GeometryGeometryZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryGeometryCollectionZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryGeometryCollectionZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    geometries?: Maybe<Array<Maybe<GeometryGeometryZm>>>
    srid: Scalars['Int']['output']
  }

/** All geometry XYM types implement this interface */
export type GeometryGeometryM = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

/** All geometry XYZ types implement this interface */
export type GeometryGeometryZ = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

/** All geometry XYZM types implement this interface */
export type GeometryGeometryZm = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

/** All geometry types implement this interface */
export type GeometryInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']['output']>
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int']['output']
}

export type GeometryLineString = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryLineString'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPoint>>>
    srid: Scalars['Int']['output']
  }

export type GeometryLineStringM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryLineStringM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryLineStringZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryLineStringZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryLineStringZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryLineStringZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointZm>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiLineString = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryMultiLineString'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    lines?: Maybe<Array<Maybe<GeometryLineString>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiLineStringM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryMultiLineStringM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    lines?: Maybe<Array<Maybe<GeometryLineStringM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiLineStringZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryMultiLineStringZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    lines?: Maybe<Array<Maybe<GeometryLineStringZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiLineStringZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryMultiLineStringZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    lines?: Maybe<Array<Maybe<GeometryLineStringZm>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPoint = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryMultiPoint'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPoint>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPointM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryMultiPointM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPointZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryMultiPointZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPointZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryMultiPointZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    points?: Maybe<Array<Maybe<GeometryPointZm>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPolygon = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryMultiPolygon'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    polygons?: Maybe<Array<Maybe<GeometryPolygon>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPolygonM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryMultiPolygonM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    polygons?: Maybe<Array<Maybe<GeometryPolygonM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPolygonZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryMultiPolygonZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    polygons?: Maybe<Array<Maybe<GeometryPolygonZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryMultiPolygonZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryMultiPolygonZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    polygons?: Maybe<Array<Maybe<GeometryPolygonZm>>>
    srid: Scalars['Int']['output']
  }

export type GeometryPoint = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryPoint'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    srid: Scalars['Int']['output']
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
  }

export type GeometryPointM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryPointM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    srid: Scalars['Int']['output']
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
  }

export type GeometryPointZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryPointZ'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    srid: Scalars['Int']['output']
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
    z: Scalars['Float']['output']
  }

export type GeometryPointZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryPointZM'
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    srid: Scalars['Int']['output']
    x: Scalars['Float']['output']
    y: Scalars['Float']['output']
    z: Scalars['Float']['output']
  }

export type GeometryPolygon = GeometryGeometry &
  GeometryInterface & {
    __typename?: 'GeometryPolygon'
    exterior?: Maybe<GeometryLineString>
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    interiors?: Maybe<Array<Maybe<GeometryLineString>>>
    srid: Scalars['Int']['output']
  }

export type GeometryPolygonM = GeometryGeometryM &
  GeometryInterface & {
    __typename?: 'GeometryPolygonM'
    exterior?: Maybe<GeometryLineStringM>
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    interiors?: Maybe<Array<Maybe<GeometryLineStringM>>>
    srid: Scalars['Int']['output']
  }

export type GeometryPolygonZ = GeometryGeometryZ &
  GeometryInterface & {
    __typename?: 'GeometryPolygonZ'
    exterior?: Maybe<GeometryLineStringZ>
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    interiors?: Maybe<Array<Maybe<GeometryLineStringZ>>>
    srid: Scalars['Int']['output']
  }

export type GeometryPolygonZm = GeometryGeometryZm &
  GeometryInterface & {
    __typename?: 'GeometryPolygonZM'
    exterior?: Maybe<GeometryLineStringZm>
    geojson?: Maybe<Scalars['GeoJSON']['output']>
    interiors?: Maybe<Array<Maybe<GeometryLineStringZm>>>
    srid: Scalars['Int']['output']
  }

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation'
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>
  /** Creates a single `EventTag`. */
  createEventTag?: Maybe<CreateEventTagPayload>
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>
  /** Deletes a single `Event` using its globally unique id. */
  deleteEvent?: Maybe<DeleteEventPayload>
  /** Deletes a single `Event` using a unique key. */
  deleteEventById?: Maybe<DeleteEventPayload>
  /** Deletes a single `EventTag` using its globally unique id. */
  deleteEventTag?: Maybe<DeleteEventTagPayload>
  /** Deletes a single `EventTag` using a unique key. */
  deleteEventTagByEventIdAndTagId?: Maybe<DeleteEventTagPayload>
  /** Deletes a single `Tag` using its globally unique id. */
  deleteTag?: Maybe<DeleteTagPayload>
  /** Deletes a single `Tag` using a unique key. */
  deleteTagById?: Maybe<DeleteTagPayload>
  /** Deletes a single `Tag` using a unique key. */
  deleteTagByName?: Maybe<DeleteTagPayload>
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventById?: Maybe<UpdateEventPayload>
  /** Updates a single `EventTag` using its globally unique id and a patch. */
  updateEventTag?: Maybe<UpdateEventTagPayload>
  /** Updates a single `EventTag` using a unique key and a patch. */
  updateEventTagByEventIdAndTagId?: Maybe<UpdateEventTagPayload>
  /** Updates a single `Tag` using its globally unique id and a patch. */
  updateTag?: Maybe<UpdateTagPayload>
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTagById?: Maybe<UpdateTagPayload>
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTagByName?: Maybe<UpdateTagPayload>
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventArgs = {
  input: CreateEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventTagArgs = {
  input: CreateEventTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventArgs = {
  input: DeleteEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByIdArgs = {
  input: DeleteEventByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventTagArgs = {
  input: DeleteEventTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventTagByEventIdAndTagIdArgs = {
  input: DeleteEventTagByEventIdAndTagIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagByIdArgs = {
  input: DeleteTagByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagByNameArgs = {
  input: DeleteTagByNameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByIdArgs = {
  input: UpdateEventByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventTagArgs = {
  input: UpdateEventTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventTagByEventIdAndTagIdArgs = {
  input: UpdateEventTagByEventIdAndTagIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagByIdArgs = {
  input: UpdateTagByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagByNameArgs = {
  input: UpdateTagByNameInput
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query'
  /** Reads and enables pagination through a set of `EventTag`. */
  allEventTags?: Maybe<EventTagsConnection>
  /** Reads and enables pagination through a set of `Event`. */
  allEvents?: Maybe<EventsConnection>
  /** Reads and enables pagination through a set of `Tag`. */
  allTags?: Maybe<TagsConnection>
  /** Reads a single `Event` using its globally unique `ID`. */
  event?: Maybe<Event>
  eventById?: Maybe<Event>
  /** Reads a single `EventTag` using its globally unique `ID`. */
  eventTag?: Maybe<EventTag>
  eventTagByEventIdAndTagId?: Maybe<EventTag>
  /** Reads and enables pagination through a set of `Event`. */
  getEventsByDate?: Maybe<EventsConnection>
  /** Reads and enables pagination through a set of `Event`. */
  getEventsByDateAndTags?: Maybe<EventsConnection>
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output']
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query
  /** Reads a single `Tag` using its globally unique `ID`. */
  tag?: Maybe<Tag>
  tagById?: Maybe<Tag>
  tagByName?: Maybe<Tag>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventTagCondition>
  filter?: InputMaybe<EventTagFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCondition>
  filter?: InputMaybe<EventFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<TagCondition>
  filter?: InputMaybe<TagFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TagsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventByIdArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventTagArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventTagByEventIdAndTagIdArgs = {
  eventId: Scalars['Int']['input']
  tagId: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryGetEventsByDateArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<EventFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  pPubDate?: InputMaybe<Scalars['String']['input']>
}

/** The root query type which gives access points into the data universe. */
export type QueryGetEventsByDateAndTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<EventFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  pPubDate?: InputMaybe<Scalars['String']['input']>
  pTagNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryTagArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryTagByIdArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryTagByNameArgs = {
  name: Scalars['String']['input']
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>
}

export type Tag = Node & {
  __typename?: 'Tag'
  /** Reads and enables pagination through a set of `EventTag`. */
  eventTagsByTagId: EventTagsConnection
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

export type TagEventTagsByTagIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventTagCondition>
  filter?: InputMaybe<EventTagFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
}

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagFilter>>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<TagFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagFilter>>
}

/** An input for mutations affecting `Tag` */
export type TagInput = {
  id?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
}

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  id?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `Tag` values. */
export type TagsConnection = {
  __typename?: 'TagsConnection'
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<TagsEdge>
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Tag` edge in the connection. */
export type TagsEdge = {
  __typename?: 'TagsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>
}

/** Methods to use when ordering `Tag`. */
export enum TagsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** All input for the `updateEventById` mutation. */
export type UpdateEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  id: Scalars['Int']['input']
}

/** All input for the `updateEvent` mutation. */
export type UpdateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Event` that was updated by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Event` mutation. */
export type UpdateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the `updateEventTagByEventIdAndTagId` mutation. */
export type UpdateEventTagByEventIdAndTagIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  eventId: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `EventTag` being updated. */
  eventTagPatch: EventTagPatch
  tagId: Scalars['Int']['input']
}

/** All input for the `updateEventTag` mutation. */
export type UpdateEventTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventTag` being updated. */
  eventTagPatch: EventTagPatch
  /** The globally unique `ID` which will identify a single `EventTag` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `EventTag` mutation. */
export type UpdateEventTagPayload = {
  __typename?: 'UpdateEventTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventTag`. */
  eventByEventId?: Maybe<Event>
  /** The `EventTag` that was updated by this mutation. */
  eventTag?: Maybe<EventTag>
  /** An edge for our `EventTag`. May be used by Relay 1. */
  eventTagEdge?: Maybe<EventTagsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Tag` that is related to this `EventTag`. */
  tagByTagId?: Maybe<Tag>
}

/** The output of our update `EventTag` mutation. */
export type UpdateEventTagPayloadEventTagEdgeArgs = {
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
}

/** All input for the `updateTagById` mutation. */
export type UpdateTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `Tag` being updated. */
  tagPatch: TagPatch
}

/** All input for the `updateTagByName` mutation. */
export type UpdateTagByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  /** An object where the defined keys will be set on the `Tag` being updated. */
  tagPatch: TagPatch
}

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Tag` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Tag` being updated. */
  tagPatch: TagPatch
}

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>
}

/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: InputMaybe<Array<TagsOrderBy>>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    GeographyGeometry: GeographyPoint
    GeographyInterface: GeographyPoint
    GeometryGeometry:
      | (Omit<GeometryGeometryCollection, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometry']>>>
        })
      | GeometryLineString
      | GeometryMultiLineString
      | GeometryMultiPoint
      | GeometryMultiPolygon
      | GeometryPoint
      | GeometryPolygon
    GeometryGeometryM:
      | (Omit<GeometryGeometryCollectionM, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryM']>>>
        })
      | GeometryLineStringM
      | GeometryMultiLineStringM
      | GeometryMultiPointM
      | GeometryMultiPolygonM
      | GeometryPointM
      | GeometryPolygonM
    GeometryGeometryZ:
      | (Omit<GeometryGeometryCollectionZ, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryZ']>>>
        })
      | GeometryLineStringZ
      | GeometryMultiLineStringZ
      | GeometryMultiPointZ
      | GeometryMultiPolygonZ
      | GeometryPointZ
      | GeometryPolygonZ
    GeometryGeometryZM:
      | (Omit<GeometryGeometryCollectionZm, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryZM']>>>
        })
      | GeometryLineStringZm
      | GeometryMultiLineStringZm
      | GeometryMultiPointZm
      | GeometryMultiPolygonZm
      | GeometryPointZm
      | GeometryPolygonZm
    GeometryInterface:
      | (Omit<GeometryGeometryCollection, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometry']>>>
        })
      | (Omit<GeometryGeometryCollectionM, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryM']>>>
        })
      | (Omit<GeometryGeometryCollectionZ, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryZ']>>>
        })
      | (Omit<GeometryGeometryCollectionZm, 'geometries'> & {
          geometries?: Maybe<Array<Maybe<_RefType['GeometryGeometryZM']>>>
        })
      | GeometryLineString
      | GeometryLineStringM
      | GeometryLineStringZ
      | GeometryLineStringZm
      | GeometryMultiLineString
      | GeometryMultiLineStringM
      | GeometryMultiLineStringZ
      | GeometryMultiLineStringZm
      | GeometryMultiPoint
      | GeometryMultiPointM
      | GeometryMultiPointZ
      | GeometryMultiPointZm
      | GeometryMultiPolygon
      | GeometryMultiPolygonM
      | GeometryMultiPolygonZ
      | GeometryMultiPolygonZm
      | GeometryPoint
      | GeometryPointM
      | GeometryPointZ
      | GeometryPointZm
      | GeometryPolygon
      | GeometryPolygonM
      | GeometryPolygonZ
      | GeometryPolygonZm
    Node:
      | Event
      | EventTag
      | (Omit<
          Query,
          | 'allEvents'
          | 'getEventsByDate'
          | 'getEventsByDateAndTags'
          | 'node'
          | 'query'
        > & {
          allEvents?: Maybe<_RefType['EventsConnection']>
          getEventsByDate?: Maybe<_RefType['EventsConnection']>
          getEventsByDateAndTags?: Maybe<_RefType['EventsConnection']>
          node?: Maybe<_RefType['Node']>
          query: _RefType['Query']
        })
      | Tag
  }

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  CreateEventInput: CreateEventInput
  CreateEventPayload: ResolverTypeWrapper<
    Omit<CreateEventPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  CreateEventTagInput: CreateEventTagInput
  CreateEventTagPayload: ResolverTypeWrapper<
    Omit<CreateEventTagPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  CreateTagInput: CreateTagInput
  CreateTagPayload: ResolverTypeWrapper<
    Omit<CreateTagPayload, 'query'> & { query?: Maybe<ResolversTypes['Query']> }
  >
  Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>
  Datetime: ResolverTypeWrapper<Scalars['Datetime']['output']>
  DatetimeFilter: DatetimeFilter
  DeleteEventByIdInput: DeleteEventByIdInput
  DeleteEventInput: DeleteEventInput
  DeleteEventPayload: ResolverTypeWrapper<
    Omit<DeleteEventPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  DeleteEventTagByEventIdAndTagIdInput: DeleteEventTagByEventIdAndTagIdInput
  DeleteEventTagInput: DeleteEventTagInput
  DeleteEventTagPayload: ResolverTypeWrapper<
    Omit<DeleteEventTagPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  DeleteTagByIdInput: DeleteTagByIdInput
  DeleteTagByNameInput: DeleteTagByNameInput
  DeleteTagInput: DeleteTagInput
  DeleteTagPayload: ResolverTypeWrapper<
    Omit<DeleteTagPayload, 'query'> & { query?: Maybe<ResolversTypes['Query']> }
  >
  Event: ResolverTypeWrapper<Event>
  EventCondition: EventCondition
  EventFilter: EventFilter
  EventInput: EventInput
  EventPatch: EventPatch
  EventTag: ResolverTypeWrapper<EventTag>
  EventTagCondition: EventTagCondition
  EventTagFilter: EventTagFilter
  EventTagInput: EventTagInput
  EventTagPatch: EventTagPatch
  EventTagsConnection: ResolverTypeWrapper<EventTagsConnection>
  EventTagsEdge: ResolverTypeWrapper<EventTagsEdge>
  EventTagsOrderBy: EventTagsOrderBy
  EventsConnection: ResolverTypeWrapper<EventsConnection>
  EventsEdge: ResolverTypeWrapper<EventsEdge>
  EventsOrderBy: EventsOrderBy
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  GeoJSON: ResolverTypeWrapper<Scalars['GeoJSON']['output']>
  GeographyGeometry: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeographyGeometry']
  >
  GeographyInterface: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeographyInterface']
  >
  GeographyPoint: ResolverTypeWrapper<GeographyPoint>
  GeometryGeometry: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeometryGeometry']
  >
  GeometryGeometryCollection: ResolverTypeWrapper<
    Omit<GeometryGeometryCollection, 'geometries'> & {
      geometries?: Maybe<Array<Maybe<ResolversTypes['GeometryGeometry']>>>
    }
  >
  GeometryGeometryCollectionM: ResolverTypeWrapper<
    Omit<GeometryGeometryCollectionM, 'geometries'> & {
      geometries?: Maybe<Array<Maybe<ResolversTypes['GeometryGeometryM']>>>
    }
  >
  GeometryGeometryCollectionZ: ResolverTypeWrapper<
    Omit<GeometryGeometryCollectionZ, 'geometries'> & {
      geometries?: Maybe<Array<Maybe<ResolversTypes['GeometryGeometryZ']>>>
    }
  >
  GeometryGeometryCollectionZM: ResolverTypeWrapper<
    Omit<GeometryGeometryCollectionZm, 'geometries'> & {
      geometries?: Maybe<Array<Maybe<ResolversTypes['GeometryGeometryZM']>>>
    }
  >
  GeometryGeometryM: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeometryGeometryM']
  >
  GeometryGeometryZ: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeometryGeometryZ']
  >
  GeometryGeometryZM: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeometryGeometryZM']
  >
  GeometryInterface: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['GeometryInterface']
  >
  GeometryLineString: ResolverTypeWrapper<GeometryLineString>
  GeometryLineStringM: ResolverTypeWrapper<GeometryLineStringM>
  GeometryLineStringZ: ResolverTypeWrapper<GeometryLineStringZ>
  GeometryLineStringZM: ResolverTypeWrapper<GeometryLineStringZm>
  GeometryMultiLineString: ResolverTypeWrapper<GeometryMultiLineString>
  GeometryMultiLineStringM: ResolverTypeWrapper<GeometryMultiLineStringM>
  GeometryMultiLineStringZ: ResolverTypeWrapper<GeometryMultiLineStringZ>
  GeometryMultiLineStringZM: ResolverTypeWrapper<GeometryMultiLineStringZm>
  GeometryMultiPoint: ResolverTypeWrapper<GeometryMultiPoint>
  GeometryMultiPointM: ResolverTypeWrapper<GeometryMultiPointM>
  GeometryMultiPointZ: ResolverTypeWrapper<GeometryMultiPointZ>
  GeometryMultiPointZM: ResolverTypeWrapper<GeometryMultiPointZm>
  GeometryMultiPolygon: ResolverTypeWrapper<GeometryMultiPolygon>
  GeometryMultiPolygonM: ResolverTypeWrapper<GeometryMultiPolygonM>
  GeometryMultiPolygonZ: ResolverTypeWrapper<GeometryMultiPolygonZ>
  GeometryMultiPolygonZM: ResolverTypeWrapper<GeometryMultiPolygonZm>
  GeometryPoint: ResolverTypeWrapper<GeometryPoint>
  GeometryPointM: ResolverTypeWrapper<GeometryPointM>
  GeometryPointZ: ResolverTypeWrapper<GeometryPointZ>
  GeometryPointZM: ResolverTypeWrapper<GeometryPointZm>
  GeometryPolygon: ResolverTypeWrapper<GeometryPolygon>
  GeometryPolygonM: ResolverTypeWrapper<GeometryPolygonM>
  GeometryPolygonZ: ResolverTypeWrapper<GeometryPolygonZ>
  GeometryPolygonZM: ResolverTypeWrapper<GeometryPolygonZm>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  IntFilter: IntFilter
  Mutation: ResolverTypeWrapper<{}>
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>
  PageInfo: ResolverTypeWrapper<PageInfo>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  StringFilter: StringFilter
  Tag: ResolverTypeWrapper<Tag>
  TagCondition: TagCondition
  TagFilter: TagFilter
  TagInput: TagInput
  TagPatch: TagPatch
  TagsConnection: ResolverTypeWrapper<TagsConnection>
  TagsEdge: ResolverTypeWrapper<TagsEdge>
  TagsOrderBy: TagsOrderBy
  UpdateEventByIdInput: UpdateEventByIdInput
  UpdateEventInput: UpdateEventInput
  UpdateEventPayload: ResolverTypeWrapper<
    Omit<UpdateEventPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  UpdateEventTagByEventIdAndTagIdInput: UpdateEventTagByEventIdAndTagIdInput
  UpdateEventTagInput: UpdateEventTagInput
  UpdateEventTagPayload: ResolverTypeWrapper<
    Omit<UpdateEventTagPayload, 'query'> & {
      query?: Maybe<ResolversTypes['Query']>
    }
  >
  UpdateTagByIdInput: UpdateTagByIdInput
  UpdateTagByNameInput: UpdateTagByNameInput
  UpdateTagInput: UpdateTagInput
  UpdateTagPayload: ResolverTypeWrapper<
    Omit<UpdateTagPayload, 'query'> & { query?: Maybe<ResolversTypes['Query']> }
  >
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output']
  CreateEventInput: CreateEventInput
  CreateEventPayload: Omit<CreateEventPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  CreateEventTagInput: CreateEventTagInput
  CreateEventTagPayload: Omit<CreateEventTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  CreateTagInput: CreateTagInput
  CreateTagPayload: Omit<CreateTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  Cursor: Scalars['Cursor']['output']
  Datetime: Scalars['Datetime']['output']
  DatetimeFilter: DatetimeFilter
  DeleteEventByIdInput: DeleteEventByIdInput
  DeleteEventInput: DeleteEventInput
  DeleteEventPayload: Omit<DeleteEventPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  DeleteEventTagByEventIdAndTagIdInput: DeleteEventTagByEventIdAndTagIdInput
  DeleteEventTagInput: DeleteEventTagInput
  DeleteEventTagPayload: Omit<DeleteEventTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  DeleteTagByIdInput: DeleteTagByIdInput
  DeleteTagByNameInput: DeleteTagByNameInput
  DeleteTagInput: DeleteTagInput
  DeleteTagPayload: Omit<DeleteTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  Event: Event
  EventCondition: EventCondition
  EventFilter: EventFilter
  EventInput: EventInput
  EventPatch: EventPatch
  EventTag: EventTag
  EventTagCondition: EventTagCondition
  EventTagFilter: EventTagFilter
  EventTagInput: EventTagInput
  EventTagPatch: EventTagPatch
  EventTagsConnection: EventTagsConnection
  EventTagsEdge: EventTagsEdge
  EventsConnection: EventsConnection
  EventsEdge: EventsEdge
  Float: Scalars['Float']['output']
  GeoJSON: Scalars['GeoJSON']['output']
  GeographyGeometry: ResolversInterfaceTypes<ResolversParentTypes>['GeographyGeometry']
  GeographyInterface: ResolversInterfaceTypes<ResolversParentTypes>['GeographyInterface']
  GeographyPoint: GeographyPoint
  GeometryGeometry: ResolversInterfaceTypes<ResolversParentTypes>['GeometryGeometry']
  GeometryGeometryCollection: Omit<GeometryGeometryCollection, 'geometries'> & {
    geometries?: Maybe<Array<Maybe<ResolversParentTypes['GeometryGeometry']>>>
  }
  GeometryGeometryCollectionM: Omit<
    GeometryGeometryCollectionM,
    'geometries'
  > & {
    geometries?: Maybe<Array<Maybe<ResolversParentTypes['GeometryGeometryM']>>>
  }
  GeometryGeometryCollectionZ: Omit<
    GeometryGeometryCollectionZ,
    'geometries'
  > & {
    geometries?: Maybe<Array<Maybe<ResolversParentTypes['GeometryGeometryZ']>>>
  }
  GeometryGeometryCollectionZM: Omit<
    GeometryGeometryCollectionZm,
    'geometries'
  > & {
    geometries?: Maybe<Array<Maybe<ResolversParentTypes['GeometryGeometryZM']>>>
  }
  GeometryGeometryM: ResolversInterfaceTypes<ResolversParentTypes>['GeometryGeometryM']
  GeometryGeometryZ: ResolversInterfaceTypes<ResolversParentTypes>['GeometryGeometryZ']
  GeometryGeometryZM: ResolversInterfaceTypes<ResolversParentTypes>['GeometryGeometryZM']
  GeometryInterface: ResolversInterfaceTypes<ResolversParentTypes>['GeometryInterface']
  GeometryLineString: GeometryLineString
  GeometryLineStringM: GeometryLineStringM
  GeometryLineStringZ: GeometryLineStringZ
  GeometryLineStringZM: GeometryLineStringZm
  GeometryMultiLineString: GeometryMultiLineString
  GeometryMultiLineStringM: GeometryMultiLineStringM
  GeometryMultiLineStringZ: GeometryMultiLineStringZ
  GeometryMultiLineStringZM: GeometryMultiLineStringZm
  GeometryMultiPoint: GeometryMultiPoint
  GeometryMultiPointM: GeometryMultiPointM
  GeometryMultiPointZ: GeometryMultiPointZ
  GeometryMultiPointZM: GeometryMultiPointZm
  GeometryMultiPolygon: GeometryMultiPolygon
  GeometryMultiPolygonM: GeometryMultiPolygonM
  GeometryMultiPolygonZ: GeometryMultiPolygonZ
  GeometryMultiPolygonZM: GeometryMultiPolygonZm
  GeometryPoint: GeometryPoint
  GeometryPointM: GeometryPointM
  GeometryPointZ: GeometryPointZ
  GeometryPointZM: GeometryPointZm
  GeometryPolygon: GeometryPolygon
  GeometryPolygonM: GeometryPolygonM
  GeometryPolygonZ: GeometryPolygonZ
  GeometryPolygonZM: GeometryPolygonZm
  ID: Scalars['ID']['output']
  Int: Scalars['Int']['output']
  IntFilter: IntFilter
  Mutation: {}
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node']
  PageInfo: PageInfo
  Query: {}
  String: Scalars['String']['output']
  StringFilter: StringFilter
  Tag: Tag
  TagCondition: TagCondition
  TagFilter: TagFilter
  TagInput: TagInput
  TagPatch: TagPatch
  TagsConnection: TagsConnection
  TagsEdge: TagsEdge
  UpdateEventByIdInput: UpdateEventByIdInput
  UpdateEventInput: UpdateEventInput
  UpdateEventPayload: Omit<UpdateEventPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  UpdateEventTagByEventIdAndTagIdInput: UpdateEventTagByEventIdAndTagIdInput
  UpdateEventTagInput: UpdateEventTagInput
  UpdateEventTagPayload: Omit<UpdateEventTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
  UpdateTagByIdInput: UpdateTagByIdInput
  UpdateTagByNameInput: UpdateTagByNameInput
  UpdateTagInput: UpdateTagInput
  UpdateTagPayload: Omit<UpdateTagPayload, 'query'> & {
    query?: Maybe<ResolversParentTypes['Query']>
  }
}

export type CreateEventPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateEventPayload'] = ResolversParentTypes['CreateEventPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>
  eventEdge?: Resolver<
    Maybe<ResolversTypes['EventsEdge']>,
    ParentType,
    ContextType,
    RequireFields<CreateEventPayloadEventEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateEventTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateEventTagPayload'] = ResolversParentTypes['CreateEventTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  eventByEventId?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType
  >
  eventTag?: Resolver<
    Maybe<ResolversTypes['EventTag']>,
    ParentType,
    ContextType
  >
  eventTagEdge?: Resolver<
    Maybe<ResolversTypes['EventTagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<CreateEventTagPayloadEventTagEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tagByTagId?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateTagPayload'] = ResolversParentTypes['CreateTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  tagEdge?: Resolver<
    Maybe<ResolversTypes['TagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<CreateTagPayloadTagEdgeArgs, 'orderBy'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface CursorScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor'
}

export interface DatetimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Datetime'], any> {
  name: 'Datetime'
}

export type DeleteEventPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteEventPayload'] = ResolversParentTypes['DeleteEventPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  deletedEventId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>
  eventEdge?: Resolver<
    Maybe<ResolversTypes['EventsEdge']>,
    ParentType,
    ContextType,
    RequireFields<DeleteEventPayloadEventEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteEventTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteEventTagPayload'] = ResolversParentTypes['DeleteEventTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  deletedEventTagId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >
  eventByEventId?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType
  >
  eventTag?: Resolver<
    Maybe<ResolversTypes['EventTag']>,
    ParentType,
    ContextType
  >
  eventTagEdge?: Resolver<
    Maybe<ResolversTypes['EventTagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<DeleteEventTagPayloadEventTagEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tagByTagId?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteTagPayload'] = ResolversParentTypes['DeleteTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  deletedTagId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  tagEdge?: Resolver<
    Maybe<ResolversTypes['TagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<DeleteTagPayloadTagEdgeArgs, 'orderBy'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<
    Maybe<ResolversTypes['Datetime']>,
    ParentType,
    ContextType
  >
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  eventEndDate?: Resolver<
    Maybe<ResolversTypes['Datetime']>,
    ParentType,
    ContextType
  >
  eventStartDate?: Resolver<
    Maybe<ResolversTypes['Datetime']>,
    ParentType,
    ContextType
  >
  eventTagsByEventId?: Resolver<
    ResolversTypes['EventTagsConnection'],
    ParentType,
    ContextType,
    RequireFields<EventEventTagsByEventIdArgs, 'orderBy'>
  >
  geoLocation?: Resolver<
    Maybe<ResolversTypes['GeographyPoint']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  pubDate?: Resolver<Maybe<ResolversTypes['Datetime']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<
    Maybe<ResolversTypes['Datetime']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventTagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTag'] = ResolversParentTypes['EventTag']
> = {
  eventByEventId?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType
  >
  eventId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  tagByTagId?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventTagsConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTagsConnection'] = ResolversParentTypes['EventTagsConnection']
> = {
  edges?: Resolver<
    Array<ResolversTypes['EventTagsEdge']>,
    ParentType,
    ContextType
  >
  nodes?: Resolver<
    Array<Maybe<ResolversTypes['EventTag']>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventTagsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTagsEdge'] = ResolversParentTypes['EventTagsEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['EventTag']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventsConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventsConnection'] = ResolversParentTypes['EventsConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['EventsEdge']>, ParentType, ContextType>
  nodes?: Resolver<
    Array<Maybe<ResolversTypes['Event']>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventsEdge'] = ResolversParentTypes['EventsEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface GeoJsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['GeoJSON'], any> {
  name: 'GeoJSON'
}

export type GeographyGeometryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeographyGeometry'] = ResolversParentTypes['GeographyGeometry']
> = {
  __resolveType: TypeResolveFn<'GeographyPoint', ParentType, ContextType>
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeographyInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeographyInterface'] = ResolversParentTypes['GeographyInterface']
> = {
  __resolveType: TypeResolveFn<'GeographyPoint', ParentType, ContextType>
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeographyPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeographyPoint'] = ResolversParentTypes['GeographyPoint']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryGeometryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometry'] = ResolversParentTypes['GeometryGeometry']
> = {
  __resolveType: TypeResolveFn<
    | 'GeometryGeometryCollection'
    | 'GeometryLineString'
    | 'GeometryMultiLineString'
    | 'GeometryMultiPoint'
    | 'GeometryMultiPolygon'
    | 'GeometryPoint'
    | 'GeometryPolygon',
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeometryGeometryCollectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryCollection'] = ResolversParentTypes['GeometryGeometryCollection']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  geometries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryGeometry']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryGeometryCollectionMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryCollectionM'] = ResolversParentTypes['GeometryGeometryCollectionM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  geometries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryGeometryM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryGeometryCollectionZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryCollectionZ'] = ResolversParentTypes['GeometryGeometryCollectionZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  geometries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryGeometryZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryGeometryCollectionZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryCollectionZM'] = ResolversParentTypes['GeometryGeometryCollectionZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  geometries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryGeometryZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryGeometryMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryM'] = ResolversParentTypes['GeometryGeometryM']
> = {
  __resolveType: TypeResolveFn<
    | 'GeometryGeometryCollectionM'
    | 'GeometryLineStringM'
    | 'GeometryMultiLineStringM'
    | 'GeometryMultiPointM'
    | 'GeometryMultiPolygonM'
    | 'GeometryPointM'
    | 'GeometryPolygonM',
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeometryGeometryZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryZ'] = ResolversParentTypes['GeometryGeometryZ']
> = {
  __resolveType: TypeResolveFn<
    | 'GeometryGeometryCollectionZ'
    | 'GeometryLineStringZ'
    | 'GeometryMultiLineStringZ'
    | 'GeometryMultiPointZ'
    | 'GeometryMultiPolygonZ'
    | 'GeometryPointZ'
    | 'GeometryPolygonZ',
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeometryGeometryZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryGeometryZM'] = ResolversParentTypes['GeometryGeometryZM']
> = {
  __resolveType: TypeResolveFn<
    | 'GeometryGeometryCollectionZM'
    | 'GeometryLineStringZM'
    | 'GeometryMultiLineStringZM'
    | 'GeometryMultiPointZM'
    | 'GeometryMultiPolygonZM'
    | 'GeometryPointZM'
    | 'GeometryPolygonZM',
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeometryInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryInterface'] = ResolversParentTypes['GeometryInterface']
> = {
  __resolveType: TypeResolveFn<
    | 'GeometryGeometryCollection'
    | 'GeometryGeometryCollectionM'
    | 'GeometryGeometryCollectionZ'
    | 'GeometryGeometryCollectionZM'
    | 'GeometryLineString'
    | 'GeometryLineStringM'
    | 'GeometryLineStringZ'
    | 'GeometryLineStringZM'
    | 'GeometryMultiLineString'
    | 'GeometryMultiLineStringM'
    | 'GeometryMultiLineStringZ'
    | 'GeometryMultiLineStringZM'
    | 'GeometryMultiPoint'
    | 'GeometryMultiPointM'
    | 'GeometryMultiPointZ'
    | 'GeometryMultiPointZM'
    | 'GeometryMultiPolygon'
    | 'GeometryMultiPolygonM'
    | 'GeometryMultiPolygonZ'
    | 'GeometryMultiPolygonZM'
    | 'GeometryPoint'
    | 'GeometryPointM'
    | 'GeometryPointZ'
    | 'GeometryPointZM'
    | 'GeometryPolygon'
    | 'GeometryPolygonM'
    | 'GeometryPolygonZ'
    | 'GeometryPolygonZM',
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type GeometryLineStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryLineString'] = ResolversParentTypes['GeometryLineString']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPoint']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryLineStringMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryLineStringM'] = ResolversParentTypes['GeometryLineStringM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryLineStringZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryLineStringZ'] = ResolversParentTypes['GeometryLineStringZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryLineStringZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryLineStringZM'] = ResolversParentTypes['GeometryLineStringZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiLineStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiLineString'] = ResolversParentTypes['GeometryMultiLineString']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  lines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineString']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiLineStringMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiLineStringM'] = ResolversParentTypes['GeometryMultiLineStringM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  lines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiLineStringZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiLineStringZ'] = ResolversParentTypes['GeometryMultiLineStringZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  lines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiLineStringZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiLineStringZM'] = ResolversParentTypes['GeometryMultiLineStringZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  lines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPoint'] = ResolversParentTypes['GeometryMultiPoint']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPoint']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPointMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPointM'] = ResolversParentTypes['GeometryMultiPointM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPointZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPointZ'] = ResolversParentTypes['GeometryMultiPointZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPointZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPointZM'] = ResolversParentTypes['GeometryMultiPointZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  points?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPointZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPolygonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPolygon'] = ResolversParentTypes['GeometryMultiPolygon']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  polygons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPolygon']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPolygonMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPolygonM'] = ResolversParentTypes['GeometryMultiPolygonM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  polygons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPolygonM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPolygonZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPolygonZ'] = ResolversParentTypes['GeometryMultiPolygonZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  polygons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPolygonZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryMultiPolygonZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryMultiPolygonZM'] = ResolversParentTypes['GeometryMultiPolygonZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  polygons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryPolygonZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPoint'] = ResolversParentTypes['GeometryPoint']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPointMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPointM'] = ResolversParentTypes['GeometryPointM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPointZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPointZ'] = ResolversParentTypes['GeometryPointZ']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  z?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPointZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPointZM'] = ResolversParentTypes['GeometryPointZM']
> = {
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  z?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPolygonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPolygon'] = ResolversParentTypes['GeometryPolygon']
> = {
  exterior?: Resolver<
    Maybe<ResolversTypes['GeometryLineString']>,
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  interiors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineString']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPolygonMResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPolygonM'] = ResolversParentTypes['GeometryPolygonM']
> = {
  exterior?: Resolver<
    Maybe<ResolversTypes['GeometryLineStringM']>,
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  interiors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPolygonZResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPolygonZ'] = ResolversParentTypes['GeometryPolygonZ']
> = {
  exterior?: Resolver<
    Maybe<ResolversTypes['GeometryLineStringZ']>,
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  interiors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringZ']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeometryPolygonZmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeometryPolygonZM'] = ResolversParentTypes['GeometryPolygonZM']
> = {
  exterior?: Resolver<
    Maybe<ResolversTypes['GeometryLineStringZM']>,
    ParentType,
    ContextType
  >
  geojson?: Resolver<Maybe<ResolversTypes['GeoJSON']>, ParentType, ContextType>
  interiors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['GeometryLineStringZM']>>>,
    ParentType,
    ContextType
  >
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createEvent?: Resolver<
    Maybe<ResolversTypes['CreateEventPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventArgs, 'input'>
  >
  createEventTag?: Resolver<
    Maybe<ResolversTypes['CreateEventTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventTagArgs, 'input'>
  >
  createTag?: Resolver<
    Maybe<ResolversTypes['CreateTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTagArgs, 'input'>
  >
  deleteEvent?: Resolver<
    Maybe<ResolversTypes['DeleteEventPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEventArgs, 'input'>
  >
  deleteEventById?: Resolver<
    Maybe<ResolversTypes['DeleteEventPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEventByIdArgs, 'input'>
  >
  deleteEventTag?: Resolver<
    Maybe<ResolversTypes['DeleteEventTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEventTagArgs, 'input'>
  >
  deleteEventTagByEventIdAndTagId?: Resolver<
    Maybe<ResolversTypes['DeleteEventTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEventTagByEventIdAndTagIdArgs, 'input'>
  >
  deleteTag?: Resolver<
    Maybe<ResolversTypes['DeleteTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagArgs, 'input'>
  >
  deleteTagById?: Resolver<
    Maybe<ResolversTypes['DeleteTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagByIdArgs, 'input'>
  >
  deleteTagByName?: Resolver<
    Maybe<ResolversTypes['DeleteTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagByNameArgs, 'input'>
  >
  updateEvent?: Resolver<
    Maybe<ResolversTypes['UpdateEventPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEventArgs, 'input'>
  >
  updateEventById?: Resolver<
    Maybe<ResolversTypes['UpdateEventPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEventByIdArgs, 'input'>
  >
  updateEventTag?: Resolver<
    Maybe<ResolversTypes['UpdateEventTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEventTagArgs, 'input'>
  >
  updateEventTagByEventIdAndTagId?: Resolver<
    Maybe<ResolversTypes['UpdateEventTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEventTagByEventIdAndTagIdArgs, 'input'>
  >
  updateTag?: Resolver<
    Maybe<ResolversTypes['UpdateTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagArgs, 'input'>
  >
  updateTagById?: Resolver<
    Maybe<ResolversTypes['UpdateTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagByIdArgs, 'input'>
  >
  updateTagByName?: Resolver<
    Maybe<ResolversTypes['UpdateTagPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagByNameArgs, 'input'>
  >
}

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = {
  __resolveType: TypeResolveFn<
    'Event' | 'EventTag' | 'Query' | 'Tag',
    ParentType,
    ContextType
  >
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
}

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  startCursor?: Resolver<
    Maybe<ResolversTypes['Cursor']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  allEventTags?: Resolver<
    Maybe<ResolversTypes['EventTagsConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllEventTagsArgs, 'orderBy'>
  >
  allEvents?: Resolver<
    Maybe<ResolversTypes['EventsConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllEventsArgs, 'orderBy'>
  >
  allTags?: Resolver<
    Maybe<ResolversTypes['TagsConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllTagsArgs, 'orderBy'>
  >
  event?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventArgs, 'nodeId'>
  >
  eventById?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventByIdArgs, 'id'>
  >
  eventTag?: Resolver<
    Maybe<ResolversTypes['EventTag']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTagArgs, 'nodeId'>
  >
  eventTagByEventIdAndTagId?: Resolver<
    Maybe<ResolversTypes['EventTag']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTagByEventIdAndTagIdArgs, 'eventId' | 'tagId'>
  >
  getEventsByDate?: Resolver<
    Maybe<ResolversTypes['EventsConnection']>,
    ParentType,
    ContextType,
    Partial<QueryGetEventsByDateArgs>
  >
  getEventsByDateAndTags?: Resolver<
    Maybe<ResolversTypes['EventsConnection']>,
    ParentType,
    ContextType,
    Partial<QueryGetEventsByDateAndTagsArgs>
  >
  node?: Resolver<
    Maybe<ResolversTypes['Node']>,
    ParentType,
    ContextType,
    RequireFields<QueryNodeArgs, 'nodeId'>
  >
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>
  tag?: Resolver<
    Maybe<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<QueryTagArgs, 'nodeId'>
  >
  tagById?: Resolver<
    Maybe<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<QueryTagByIdArgs, 'id'>
  >
  tagByName?: Resolver<
    Maybe<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<QueryTagByNameArgs, 'name'>
  >
}

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']
> = {
  eventTagsByTagId?: Resolver<
    ResolversTypes['EventTagsConnection'],
    ParentType,
    ContextType,
    RequireFields<TagEventTagsByTagIdArgs, 'orderBy'>
  >
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsConnection'] = ResolversParentTypes['TagsConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['TagsEdge']>, ParentType, ContextType>
  nodes?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsEdge'] = ResolversParentTypes['TagsEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateEventPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateEventPayload'] = ResolversParentTypes['UpdateEventPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>
  eventEdge?: Resolver<
    Maybe<ResolversTypes['EventsEdge']>,
    ParentType,
    ContextType,
    RequireFields<UpdateEventPayloadEventEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateEventTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateEventTagPayload'] = ResolversParentTypes['UpdateEventTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  eventByEventId?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType
  >
  eventTag?: Resolver<
    Maybe<ResolversTypes['EventTag']>,
    ParentType,
    ContextType
  >
  eventTagEdge?: Resolver<
    Maybe<ResolversTypes['EventTagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<UpdateEventTagPayloadEventTagEdgeArgs, 'orderBy'>
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tagByTagId?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateTagPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateTagPayload'] = ResolversParentTypes['UpdateTagPayload']
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>
  tagEdge?: Resolver<
    Maybe<ResolversTypes['TagsEdge']>,
    ParentType,
    ContextType,
    RequireFields<UpdateTagPayloadTagEdgeArgs, 'orderBy'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  CreateEventPayload?: CreateEventPayloadResolvers<ContextType>
  CreateEventTagPayload?: CreateEventTagPayloadResolvers<ContextType>
  CreateTagPayload?: CreateTagPayloadResolvers<ContextType>
  Cursor?: GraphQLScalarType
  Datetime?: GraphQLScalarType
  DeleteEventPayload?: DeleteEventPayloadResolvers<ContextType>
  DeleteEventTagPayload?: DeleteEventTagPayloadResolvers<ContextType>
  DeleteTagPayload?: DeleteTagPayloadResolvers<ContextType>
  Event?: EventResolvers<ContextType>
  EventTag?: EventTagResolvers<ContextType>
  EventTagsConnection?: EventTagsConnectionResolvers<ContextType>
  EventTagsEdge?: EventTagsEdgeResolvers<ContextType>
  EventsConnection?: EventsConnectionResolvers<ContextType>
  EventsEdge?: EventsEdgeResolvers<ContextType>
  GeoJSON?: GraphQLScalarType
  GeographyGeometry?: GeographyGeometryResolvers<ContextType>
  GeographyInterface?: GeographyInterfaceResolvers<ContextType>
  GeographyPoint?: GeographyPointResolvers<ContextType>
  GeometryGeometry?: GeometryGeometryResolvers<ContextType>
  GeometryGeometryCollection?: GeometryGeometryCollectionResolvers<ContextType>
  GeometryGeometryCollectionM?: GeometryGeometryCollectionMResolvers<ContextType>
  GeometryGeometryCollectionZ?: GeometryGeometryCollectionZResolvers<ContextType>
  GeometryGeometryCollectionZM?: GeometryGeometryCollectionZmResolvers<ContextType>
  GeometryGeometryM?: GeometryGeometryMResolvers<ContextType>
  GeometryGeometryZ?: GeometryGeometryZResolvers<ContextType>
  GeometryGeometryZM?: GeometryGeometryZmResolvers<ContextType>
  GeometryInterface?: GeometryInterfaceResolvers<ContextType>
  GeometryLineString?: GeometryLineStringResolvers<ContextType>
  GeometryLineStringM?: GeometryLineStringMResolvers<ContextType>
  GeometryLineStringZ?: GeometryLineStringZResolvers<ContextType>
  GeometryLineStringZM?: GeometryLineStringZmResolvers<ContextType>
  GeometryMultiLineString?: GeometryMultiLineStringResolvers<ContextType>
  GeometryMultiLineStringM?: GeometryMultiLineStringMResolvers<ContextType>
  GeometryMultiLineStringZ?: GeometryMultiLineStringZResolvers<ContextType>
  GeometryMultiLineStringZM?: GeometryMultiLineStringZmResolvers<ContextType>
  GeometryMultiPoint?: GeometryMultiPointResolvers<ContextType>
  GeometryMultiPointM?: GeometryMultiPointMResolvers<ContextType>
  GeometryMultiPointZ?: GeometryMultiPointZResolvers<ContextType>
  GeometryMultiPointZM?: GeometryMultiPointZmResolvers<ContextType>
  GeometryMultiPolygon?: GeometryMultiPolygonResolvers<ContextType>
  GeometryMultiPolygonM?: GeometryMultiPolygonMResolvers<ContextType>
  GeometryMultiPolygonZ?: GeometryMultiPolygonZResolvers<ContextType>
  GeometryMultiPolygonZM?: GeometryMultiPolygonZmResolvers<ContextType>
  GeometryPoint?: GeometryPointResolvers<ContextType>
  GeometryPointM?: GeometryPointMResolvers<ContextType>
  GeometryPointZ?: GeometryPointZResolvers<ContextType>
  GeometryPointZM?: GeometryPointZmResolvers<ContextType>
  GeometryPolygon?: GeometryPolygonResolvers<ContextType>
  GeometryPolygonM?: GeometryPolygonMResolvers<ContextType>
  GeometryPolygonZ?: GeometryPolygonZResolvers<ContextType>
  GeometryPolygonZM?: GeometryPolygonZmResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Node?: NodeResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Tag?: TagResolvers<ContextType>
  TagsConnection?: TagsConnectionResolvers<ContextType>
  TagsEdge?: TagsEdgeResolvers<ContextType>
  UpdateEventPayload?: UpdateEventPayloadResolvers<ContextType>
  UpdateEventTagPayload?: UpdateEventTagPayloadResolvers<ContextType>
  UpdateTagPayload?: UpdateTagPayloadResolvers<ContextType>
}
