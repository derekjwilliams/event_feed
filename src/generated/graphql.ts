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
  _text: { input: any; output: any }
  geography: { input: any; output: any }
  geometry: { input: any; output: any }
  timestamptz: { input: any; output: any }
}

/** columns and relationships of "event_tags" */
export type EventTags = Node & {
  __typename?: 'EventTags'
  /** An object relationship */
  event: Events
  eventId: Scalars['Int']['output']
  id: Scalars['ID']['output']
  /** An object relationship */
  tag: Tags
  tagId: Scalars['Int']['output']
}

/** order by aggregate values of table "event_tags" */
export type EventTagsAggregateOrderBy = {
  avg?: InputMaybe<EventTagsAvgOrderBy>
  count?: InputMaybe<OrderBy>
  max?: InputMaybe<EventTagsMaxOrderBy>
  min?: InputMaybe<EventTagsMinOrderBy>
  stddev?: InputMaybe<EventTagsStddevOrderBy>
  stddevPop?: InputMaybe<EventTagsStddevPopOrderBy>
  stddevSamp?: InputMaybe<EventTagsStddevSampOrderBy>
  sum?: InputMaybe<EventTagsSumOrderBy>
  varPop?: InputMaybe<EventTagsVarPopOrderBy>
  varSamp?: InputMaybe<EventTagsVarSampOrderBy>
  variance?: InputMaybe<EventTagsVarianceOrderBy>
}

/** order by avg() on columns of table "event_tags" */
export type EventTagsAvgOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** Boolean expression to filter rows from the table "event_tags". All fields are combined with a logical 'AND'. */
export type EventTagsBoolExp = {
  _and?: InputMaybe<Array<EventTagsBoolExp>>
  _not?: InputMaybe<EventTagsBoolExp>
  _or?: InputMaybe<Array<EventTagsBoolExp>>
  event?: InputMaybe<EventsBoolExp>
  eventId?: InputMaybe<IntComparisonExp>
  tag?: InputMaybe<TagsBoolExp>
  tagId?: InputMaybe<IntComparisonExp>
}

/** A Relay connection object on "event_tags" */
export type EventTagsConnection = {
  __typename?: 'EventTagsConnection'
  edges: Array<EventTagsEdge>
  pageInfo: PageInfo
}

export type EventTagsEdge = {
  __typename?: 'EventTagsEdge'
  cursor: Scalars['String']['output']
  node: EventTags
}

/** order by max() on columns of table "event_tags" */
export type EventTagsMaxOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by min() on columns of table "event_tags" */
export type EventTagsMinOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** Ordering options when selecting data from "event_tags". */
export type EventTagsOrderBy = {
  event?: InputMaybe<EventsOrderBy>
  eventId?: InputMaybe<OrderBy>
  tag?: InputMaybe<TagsOrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** select columns of table "event_tags" */
export enum EventTagsSelectColumn {
  /** column name */
  EventId = 'eventId',
  /** column name */
  TagId = 'tagId',
}

/** order by stddev() on columns of table "event_tags" */
export type EventTagsStddevOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by stddevPop() on columns of table "event_tags" */
export type EventTagsStddevPopOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by stddevSamp() on columns of table "event_tags" */
export type EventTagsStddevSampOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by sum() on columns of table "event_tags" */
export type EventTagsSumOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by varPop() on columns of table "event_tags" */
export type EventTagsVarPopOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by varSamp() on columns of table "event_tags" */
export type EventTagsVarSampOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** order by variance() on columns of table "event_tags" */
export type EventTagsVarianceOrderBy = {
  eventId?: InputMaybe<OrderBy>
  tagId?: InputMaybe<OrderBy>
}

/** columns and relationships of "events" */
export type Events = Node & {
  __typename?: 'Events'
  author?: Maybe<Scalars['String']['output']>
  baseUrl?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  eventEndDate?: Maybe<Scalars['timestamptz']['output']>
  eventStartDate?: Maybe<Scalars['timestamptz']['output']>
  /** An array relationship */
  eventTags: Array<EventTags>
  /** Pipe separated list of tags for event */
  eventTagsAsString?: Maybe<Scalars['String']['output']>
  /** An array relationship connection */
  eventTags_connection: EventTagsConnection
  geoLocation?: Maybe<Scalars['geography']['output']>
  id: Scalars['ID']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  link?: Maybe<Scalars['String']['output']>
  location?: Maybe<Scalars['String']['output']>
  pubDate?: Maybe<Scalars['timestamptz']['output']>
  title: Scalars['String']['output']
}

/** columns and relationships of "events" */
export type EventsEventTagsArgs = {
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

/** columns and relationships of "events" */
export type EventsEventTags_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type EventsBoolExp = {
  _and?: InputMaybe<Array<EventsBoolExp>>
  _not?: InputMaybe<EventsBoolExp>
  _or?: InputMaybe<Array<EventsBoolExp>>
  author?: InputMaybe<StringComparisonExp>
  baseUrl?: InputMaybe<StringComparisonExp>
  content?: InputMaybe<StringComparisonExp>
  description?: InputMaybe<StringComparisonExp>
  eventEndDate?: InputMaybe<TimestamptzComparisonExp>
  eventStartDate?: InputMaybe<TimestamptzComparisonExp>
  eventTags?: InputMaybe<EventTagsBoolExp>
  eventTagsAsString?: InputMaybe<StringComparisonExp>
  geoLocation?: InputMaybe<GeographyComparisonExp>
  id?: InputMaybe<IntComparisonExp>
  imageUrl?: InputMaybe<StringComparisonExp>
  link?: InputMaybe<StringComparisonExp>
  location?: InputMaybe<StringComparisonExp>
  pubDate?: InputMaybe<TimestamptzComparisonExp>
  title?: InputMaybe<StringComparisonExp>
}

/** A Relay connection object on "events" */
export type EventsConnection = {
  __typename?: 'EventsConnection'
  edges: Array<EventsEdge>
  pageInfo: PageInfo
}

export type EventsEdge = {
  __typename?: 'EventsEdge'
  cursor: Scalars['String']['output']
  node: Events
}

/** Ordering options when selecting data from "events". */
export type EventsOrderBy = {
  author?: InputMaybe<OrderBy>
  baseUrl?: InputMaybe<OrderBy>
  content?: InputMaybe<OrderBy>
  description?: InputMaybe<OrderBy>
  eventEndDate?: InputMaybe<OrderBy>
  eventStartDate?: InputMaybe<OrderBy>
  eventTagsAggregate?: InputMaybe<EventTagsAggregateOrderBy>
  eventTagsAsString?: InputMaybe<OrderBy>
  geoLocation?: InputMaybe<OrderBy>
  id?: InputMaybe<OrderBy>
  imageUrl?: InputMaybe<OrderBy>
  link?: InputMaybe<OrderBy>
  location?: InputMaybe<OrderBy>
  pubDate?: InputMaybe<OrderBy>
  title?: InputMaybe<OrderBy>
}

/** select columns of table "events" */
export enum EventsSelectColumn {
  /** column name */
  Author = 'author',
  /** column name */
  BaseUrl = 'baseUrl',
  /** column name */
  Content = 'content',
  /** column name */
  Description = 'description',
  /** column name */
  EventEndDate = 'eventEndDate',
  /** column name */
  EventStartDate = 'eventStartDate',
  /** column name */
  GeoLocation = 'geoLocation',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageUrl',
  /** column name */
  Link = 'link',
  /** column name */
  Location = 'location',
  /** column name */
  PubDate = 'pubDate',
  /** column name */
  Title = 'title',
}

export type GeographyCastExp = {
  geometry?: InputMaybe<GeometryComparisonExp>
}

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type GeographyComparisonExp = {
  _cast?: InputMaybe<GeographyCastExp>
  _eq?: InputMaybe<Scalars['geography']['input']>
  _gt?: InputMaybe<Scalars['geography']['input']>
  _gte?: InputMaybe<Scalars['geography']['input']>
  _in?: InputMaybe<Array<Scalars['geography']['input']>>
  _isNull?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['geography']['input']>
  _lte?: InputMaybe<Scalars['geography']['input']>
  _neq?: InputMaybe<Scalars['geography']['input']>
  _nin?: InputMaybe<Array<Scalars['geography']['input']>>
  /** is the column within a given distance from the given geography value */
  _stDWithin?: InputMaybe<St_D_Within_Geography_Input>
  /** does the column spatially intersect the given geography value */
  _stIntersects?: InputMaybe<Scalars['geography']['input']>
}

export type GeometryCastExp = {
  geography?: InputMaybe<GeographyComparisonExp>
}

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type GeometryComparisonExp = {
  _cast?: InputMaybe<GeometryCastExp>
  _eq?: InputMaybe<Scalars['geometry']['input']>
  _gt?: InputMaybe<Scalars['geometry']['input']>
  _gte?: InputMaybe<Scalars['geometry']['input']>
  _in?: InputMaybe<Array<Scalars['geometry']['input']>>
  _isNull?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['geometry']['input']>
  _lte?: InputMaybe<Scalars['geometry']['input']>
  _neq?: InputMaybe<Scalars['geometry']['input']>
  _nin?: InputMaybe<Array<Scalars['geometry']['input']>>
  /** is the column within a given 3D distance from the given geometry value */
  _st3dDWithin?: InputMaybe<St_D_Within_Input>
  /** does the column spatially intersect the given geometry value in 3D */
  _st3dIntersects?: InputMaybe<Scalars['geometry']['input']>
  /** does the column contain the given geometry value */
  _stContains?: InputMaybe<Scalars['geometry']['input']>
  /** does the column cross the given geometry value */
  _stCrosses?: InputMaybe<Scalars['geometry']['input']>
  /** is the column within a given distance from the given geometry value */
  _stDWithin?: InputMaybe<St_D_Within_Input>
  /** is the column equal to given geometry value (directionality is ignored) */
  _stEquals?: InputMaybe<Scalars['geometry']['input']>
  /** does the column spatially intersect the given geometry value */
  _stIntersects?: InputMaybe<Scalars['geometry']['input']>
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _stOverlaps?: InputMaybe<Scalars['geometry']['input']>
  /** does the column have atleast one point in common with the given geometry value */
  _stTouches?: InputMaybe<Scalars['geometry']['input']>
  /** is the column contained in the given geometry value */
  _stWithin?: InputMaybe<Scalars['geometry']['input']>
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>
  _gt?: InputMaybe<Scalars['Int']['input']>
  _gte?: InputMaybe<Scalars['Int']['input']>
  _in?: InputMaybe<Array<Scalars['Int']['input']>>
  _isNull?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['Int']['input']>
  _lte?: InputMaybe<Scalars['Int']['input']>
  _neq?: InputMaybe<Scalars['Int']['input']>
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** An object with globally unique ID */
export type Node = {
  /** A globally unique identifier */
  id: Scalars['ID']['output']
}

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST',
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor: Scalars['String']['output']
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor: Scalars['String']['output']
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>
  _gt?: InputMaybe<Scalars['String']['input']>
  _gte?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>
  _in?: InputMaybe<Array<Scalars['String']['input']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>
  _isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>
  _lt?: InputMaybe<Scalars['String']['input']>
  _lte?: InputMaybe<Scalars['String']['input']>
  _neq?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>
  _nin?: InputMaybe<Array<Scalars['String']['input']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>
}

/** columns and relationships of "tags" */
export type Tags = Node & {
  __typename?: 'Tags'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  /** An array relationship */
  tagEvents: Array<EventTags>
  /** An array relationship connection */
  tagEvents_connection: EventTagsConnection
}

/** columns and relationships of "tags" */
export type TagsTagEventsArgs = {
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

/** columns and relationships of "tags" */
export type TagsTagEvents_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type TagsBoolExp = {
  _and?: InputMaybe<Array<TagsBoolExp>>
  _not?: InputMaybe<TagsBoolExp>
  _or?: InputMaybe<Array<TagsBoolExp>>
  id?: InputMaybe<IntComparisonExp>
  name?: InputMaybe<StringComparisonExp>
  tagEvents?: InputMaybe<EventTagsBoolExp>
}

/** A Relay connection object on "tags" */
export type TagsConnection = {
  __typename?: 'TagsConnection'
  edges: Array<TagsEdge>
  pageInfo: PageInfo
}

export type TagsEdge = {
  __typename?: 'TagsEdge'
  cursor: Scalars['String']['output']
  node: Tags
}

/** Ordering options when selecting data from "tags". */
export type TagsOrderBy = {
  id?: InputMaybe<OrderBy>
  name?: InputMaybe<OrderBy>
  tagEventsAggregate?: InputMaybe<EventTagsAggregateOrderBy>
}

/** select columns of table "tags" */
export enum TagsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>
  _gt?: InputMaybe<Scalars['timestamptz']['input']>
  _gte?: InputMaybe<Scalars['timestamptz']['input']>
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>
  _isNull?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['timestamptz']['input']>
  _lte?: InputMaybe<Scalars['timestamptz']['input']>
  _neq?: InputMaybe<Scalars['timestamptz']['input']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>
}

export type EventsByDateAndTagsArgs = {
  p_date_window_end?: InputMaybe<Scalars['timestamptz']['input']>
  p_date_window_start?: InputMaybe<Scalars['timestamptz']['input']>
  p_pub_date?: InputMaybe<Scalars['timestamptz']['input']>
  p_tag_names?: InputMaybe<Scalars['_text']['input']>
}

export type GetEventsByDateAndTagsArgs = {
  p_date_window_end?: InputMaybe<Scalars['String']['input']>
  p_date_window_start?: InputMaybe<Scalars['String']['input']>
  p_pub_date?: InputMaybe<Scalars['String']['input']>
  p_tag_names?: InputMaybe<Scalars['_text']['input']>
}

export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "event_tags" */
  eventTagsConnection: EventTagsConnection
  /** execute function "events_by_date_and_tags" which returns "events" */
  eventsByDateAndTags_connection: EventsConnection
  /** fetch data from the table: "events" */
  eventsConnection: EventsConnection
  /** execute function "get_events_by_date_and_tags" which returns "events" */
  getEventsByDateAndTags_connection: EventsConnection
  node?: Maybe<Node>
  /** fetch data from the table: "tags" */
  tagsConnection: TagsConnection
}

export type Query_RootEventTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

export type Query_RootEventsByDateAndTags_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  args: EventsByDateAndTagsArgs
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Query_RootEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Query_RootGetEventsByDateAndTags_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  args: GetEventsByDateAndTagsArgs
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Query_RootNodeArgs = {
  id: Scalars['ID']['input']
}

export type Query_RootTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<TagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TagsOrderBy>>
  where?: InputMaybe<TagsBoolExp>
}

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float']['input']
  from: Scalars['geography']['input']
  use_spheroid?: InputMaybe<Scalars['Boolean']['input']>
}

export type St_D_Within_Input = {
  distance: Scalars['Float']['input']
  from: Scalars['geometry']['input']
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "event_tags" */
  eventTagsConnection: EventTagsConnection
  /** execute function "events_by_date_and_tags" which returns "events" */
  eventsByDateAndTags_connection: EventsConnection
  /** fetch data from the table: "events" */
  eventsConnection: EventsConnection
  /** execute function "get_events_by_date_and_tags" which returns "events" */
  getEventsByDateAndTags_connection: EventsConnection
  node?: Maybe<Node>
  /** fetch data from the table: "tags" */
  tagsConnection: TagsConnection
}

export type Subscription_RootEventTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventTagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventTagsOrderBy>>
  where?: InputMaybe<EventTagsBoolExp>
}

export type Subscription_RootEventsByDateAndTags_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  args: EventsByDateAndTagsArgs
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Subscription_RootEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Subscription_RootGetEventsByDateAndTags_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  args: GetEventsByDateAndTagsArgs
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<EventsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
  where?: InputMaybe<EventsBoolExp>
}

export type Subscription_RootNodeArgs = {
  id: Scalars['ID']['input']
}

export type Subscription_RootTagsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  distinctOn?: InputMaybe<Array<TagsSelectColumn>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TagsOrderBy>>
  where?: InputMaybe<TagsBoolExp>
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
    Node: EventTags | Events | Tags
  }

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  EventTags: ResolverTypeWrapper<EventTags>
  EventTagsAggregateOrderBy: EventTagsAggregateOrderBy
  EventTagsAvgOrderBy: EventTagsAvgOrderBy
  EventTagsBoolExp: EventTagsBoolExp
  EventTagsConnection: ResolverTypeWrapper<EventTagsConnection>
  EventTagsEdge: ResolverTypeWrapper<EventTagsEdge>
  EventTagsMaxOrderBy: EventTagsMaxOrderBy
  EventTagsMinOrderBy: EventTagsMinOrderBy
  EventTagsOrderBy: EventTagsOrderBy
  EventTagsSelectColumn: EventTagsSelectColumn
  EventTagsStddevOrderBy: EventTagsStddevOrderBy
  EventTagsStddevPopOrderBy: EventTagsStddevPopOrderBy
  EventTagsStddevSampOrderBy: EventTagsStddevSampOrderBy
  EventTagsSumOrderBy: EventTagsSumOrderBy
  EventTagsVarPopOrderBy: EventTagsVarPopOrderBy
  EventTagsVarSampOrderBy: EventTagsVarSampOrderBy
  EventTagsVarianceOrderBy: EventTagsVarianceOrderBy
  Events: ResolverTypeWrapper<Events>
  EventsBoolExp: EventsBoolExp
  EventsConnection: ResolverTypeWrapper<EventsConnection>
  EventsEdge: ResolverTypeWrapper<EventsEdge>
  EventsOrderBy: EventsOrderBy
  EventsSelectColumn: EventsSelectColumn
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  GeographyCastExp: GeographyCastExp
  GeographyComparisonExp: GeographyComparisonExp
  GeometryCastExp: GeometryCastExp
  GeometryComparisonExp: GeometryComparisonExp
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  IntComparisonExp: IntComparisonExp
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>
  OrderBy: OrderBy
  PageInfo: ResolverTypeWrapper<PageInfo>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  StringComparisonExp: StringComparisonExp
  Tags: ResolverTypeWrapper<Tags>
  TagsBoolExp: TagsBoolExp
  TagsConnection: ResolverTypeWrapper<TagsConnection>
  TagsEdge: ResolverTypeWrapper<TagsEdge>
  TagsOrderBy: TagsOrderBy
  TagsSelectColumn: TagsSelectColumn
  TimestamptzComparisonExp: TimestamptzComparisonExp
  _text: ResolverTypeWrapper<Scalars['_text']['output']>
  eventsByDateAndTagsArgs: EventsByDateAndTagsArgs
  geography: ResolverTypeWrapper<Scalars['geography']['output']>
  geometry: ResolverTypeWrapper<Scalars['geometry']['output']>
  getEventsByDateAndTagsArgs: GetEventsByDateAndTagsArgs
  query_root: ResolverTypeWrapper<{}>
  st_d_within_geography_input: St_D_Within_Geography_Input
  st_d_within_input: St_D_Within_Input
  subscription_root: ResolverTypeWrapper<{}>
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']['output']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output']
  EventTags: EventTags
  EventTagsAggregateOrderBy: EventTagsAggregateOrderBy
  EventTagsAvgOrderBy: EventTagsAvgOrderBy
  EventTagsBoolExp: EventTagsBoolExp
  EventTagsConnection: EventTagsConnection
  EventTagsEdge: EventTagsEdge
  EventTagsMaxOrderBy: EventTagsMaxOrderBy
  EventTagsMinOrderBy: EventTagsMinOrderBy
  EventTagsOrderBy: EventTagsOrderBy
  EventTagsStddevOrderBy: EventTagsStddevOrderBy
  EventTagsStddevPopOrderBy: EventTagsStddevPopOrderBy
  EventTagsStddevSampOrderBy: EventTagsStddevSampOrderBy
  EventTagsSumOrderBy: EventTagsSumOrderBy
  EventTagsVarPopOrderBy: EventTagsVarPopOrderBy
  EventTagsVarSampOrderBy: EventTagsVarSampOrderBy
  EventTagsVarianceOrderBy: EventTagsVarianceOrderBy
  Events: Events
  EventsBoolExp: EventsBoolExp
  EventsConnection: EventsConnection
  EventsEdge: EventsEdge
  EventsOrderBy: EventsOrderBy
  Float: Scalars['Float']['output']
  GeographyCastExp: GeographyCastExp
  GeographyComparisonExp: GeographyComparisonExp
  GeometryCastExp: GeometryCastExp
  GeometryComparisonExp: GeometryComparisonExp
  ID: Scalars['ID']['output']
  Int: Scalars['Int']['output']
  IntComparisonExp: IntComparisonExp
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node']
  PageInfo: PageInfo
  String: Scalars['String']['output']
  StringComparisonExp: StringComparisonExp
  Tags: Tags
  TagsBoolExp: TagsBoolExp
  TagsConnection: TagsConnection
  TagsEdge: TagsEdge
  TagsOrderBy: TagsOrderBy
  TimestamptzComparisonExp: TimestamptzComparisonExp
  _text: Scalars['_text']['output']
  eventsByDateAndTagsArgs: EventsByDateAndTagsArgs
  geography: Scalars['geography']['output']
  geometry: Scalars['geometry']['output']
  getEventsByDateAndTagsArgs: GetEventsByDateAndTagsArgs
  query_root: {}
  st_d_within_geography_input: St_D_Within_Geography_Input
  st_d_within_input: St_D_Within_Input
  subscription_root: {}
  timestamptz: Scalars['timestamptz']['output']
}

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean']['input']
  ttl?: Scalars['Int']['input']
}

export type CachedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CachedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EventTagsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTags'] = ResolversParentTypes['EventTags']
> = {
  event?: Resolver<ResolversTypes['Events'], ParentType, ContextType>
  eventId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  tag?: Resolver<ResolversTypes['Tags'], ParentType, ContextType>
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
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventTagsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventTagsEdge'] = ResolversParentTypes['EventTagsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['EventTags'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Events'] = ResolversParentTypes['Events']
> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  baseUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  eventEndDate?: Resolver<
    Maybe<ResolversTypes['timestamptz']>,
    ParentType,
    ContextType
  >
  eventStartDate?: Resolver<
    Maybe<ResolversTypes['timestamptz']>,
    ParentType,
    ContextType
  >
  eventTags?: Resolver<
    Array<ResolversTypes['EventTags']>,
    ParentType,
    ContextType,
    Partial<EventsEventTagsArgs>
  >
  eventTagsAsString?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  eventTags_connection?: Resolver<
    ResolversTypes['EventTagsConnection'],
    ParentType,
    ContextType,
    Partial<EventsEventTags_ConnectionArgs>
  >
  geoLocation?: Resolver<
    Maybe<ResolversTypes['geography']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  pubDate?: Resolver<
    Maybe<ResolversTypes['timestamptz']>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventsConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventsConnection'] = ResolversParentTypes['EventsConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['EventsEdge']>, ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EventsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventsEdge'] = ResolversParentTypes['EventsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Events'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = {
  __resolveType: TypeResolveFn<
    'EventTags' | 'Events' | 'Tags',
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
}

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tags'] = ResolversParentTypes['Tags']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tagEvents?: Resolver<
    Array<ResolversTypes['EventTags']>,
    ParentType,
    ContextType,
    Partial<TagsTagEventsArgs>
  >
  tagEvents_connection?: Resolver<
    ResolversTypes['EventTagsConnection'],
    ParentType,
    ContextType,
    Partial<TagsTagEvents_ConnectionArgs>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsConnection'] = ResolversParentTypes['TagsConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['TagsEdge']>, ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsEdge'] = ResolversParentTypes['TagsEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Tags'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface _TextScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['_text'], any> {
  name: '_text'
}

export interface GeographyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['geography'], any> {
  name: 'geography'
}

export interface GeometryScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['geometry'], any> {
  name: 'geometry'
}

export type Query_RootResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']
> = {
  eventTagsConnection?: Resolver<
    ResolversTypes['EventTagsConnection'],
    ParentType,
    ContextType,
    Partial<Query_RootEventTagsConnectionArgs>
  >
  eventsByDateAndTags_connection?: Resolver<
    ResolversTypes['EventsConnection'],
    ParentType,
    ContextType,
    RequireFields<Query_RootEventsByDateAndTags_ConnectionArgs, 'args'>
  >
  eventsConnection?: Resolver<
    ResolversTypes['EventsConnection'],
    ParentType,
    ContextType,
    Partial<Query_RootEventsConnectionArgs>
  >
  getEventsByDateAndTags_connection?: Resolver<
    ResolversTypes['EventsConnection'],
    ParentType,
    ContextType,
    RequireFields<Query_RootGetEventsByDateAndTags_ConnectionArgs, 'args'>
  >
  node?: Resolver<
    Maybe<ResolversTypes['Node']>,
    ParentType,
    ContextType,
    RequireFields<Query_RootNodeArgs, 'id'>
  >
  tagsConnection?: Resolver<
    ResolversTypes['TagsConnection'],
    ParentType,
    ContextType,
    Partial<Query_RootTagsConnectionArgs>
  >
}

export type Subscription_RootResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']
> = {
  eventTagsConnection?: SubscriptionResolver<
    ResolversTypes['EventTagsConnection'],
    'eventTagsConnection',
    ParentType,
    ContextType,
    Partial<Subscription_RootEventTagsConnectionArgs>
  >
  eventsByDateAndTags_connection?: SubscriptionResolver<
    ResolversTypes['EventsConnection'],
    'eventsByDateAndTags_connection',
    ParentType,
    ContextType,
    RequireFields<Subscription_RootEventsByDateAndTags_ConnectionArgs, 'args'>
  >
  eventsConnection?: SubscriptionResolver<
    ResolversTypes['EventsConnection'],
    'eventsConnection',
    ParentType,
    ContextType,
    Partial<Subscription_RootEventsConnectionArgs>
  >
  getEventsByDateAndTags_connection?: SubscriptionResolver<
    ResolversTypes['EventsConnection'],
    'getEventsByDateAndTags_connection',
    ParentType,
    ContextType,
    RequireFields<
      Subscription_RootGetEventsByDateAndTags_ConnectionArgs,
      'args'
    >
  >
  node?: SubscriptionResolver<
    Maybe<ResolversTypes['Node']>,
    'node',
    ParentType,
    ContextType,
    RequireFields<Subscription_RootNodeArgs, 'id'>
  >
  tagsConnection?: SubscriptionResolver<
    ResolversTypes['TagsConnection'],
    'tagsConnection',
    ParentType,
    ContextType,
    Partial<Subscription_RootTagsConnectionArgs>
  >
}

export interface TimestamptzScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz'
}

export type Resolvers<ContextType = any> = {
  EventTags?: EventTagsResolvers<ContextType>
  EventTagsConnection?: EventTagsConnectionResolvers<ContextType>
  EventTagsEdge?: EventTagsEdgeResolvers<ContextType>
  Events?: EventsResolvers<ContextType>
  EventsConnection?: EventsConnectionResolvers<ContextType>
  EventsEdge?: EventsEdgeResolvers<ContextType>
  Node?: NodeResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Tags?: TagsResolvers<ContextType>
  TagsConnection?: TagsConnectionResolvers<ContextType>
  TagsEdge?: TagsEdgeResolvers<ContextType>
  _text?: GraphQLScalarType
  geography?: GraphQLScalarType
  geometry?: GraphQLScalarType
  query_root?: Query_RootResolvers<ContextType>
  subscription_root?: Subscription_RootResolvers<ContextType>
  timestamptz?: GraphQLScalarType
}

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>
}
