import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
 */
  Datetime: any,
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any,
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any,
  /** 
 * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
 */
  JwtToken: any,
};

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String'],
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
   __typename: 'AuthenticatePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  jwtToken?: Maybe<Scalars['JwtToken']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>,
};

/** All input for the create `Job` mutation. */
export type CreateJobInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Job` to be created by this mutation. */
  job: JobInput,
};

/** The output of our create `Job` mutation. */
export type CreateJobPayload = {
   __typename: 'CreateJobPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Job` that was created by this mutation. */
  job?: Maybe<Job>,
  /** An edge for our `Job`. May be used by Relay 1. */
  jobEdge?: Maybe<JobsEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Job`. */
  user?: Maybe<User>,
};


/** The output of our create `Job` mutation. */
export type CreateJobPayloadJobEdgeArgs = {
  orderBy?: Maybe<Array<JobsOrderBy>>
};

/** All input for the create `Mile` mutation. */
export type CreateMileInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Mile` to be created by this mutation. */
  mile: MileInput,
};

/** The output of our create `Mile` mutation. */
export type CreateMilePayload = {
   __typename: 'CreateMilePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Mile` that was created by this mutation. */
  mile?: Maybe<Mile>,
  /** An edge for our `Mile`. May be used by Relay 1. */
  mileEdge?: Maybe<MilesEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Mile`. */
  user?: Maybe<User>,
};


/** The output of our create `Mile` mutation. */
export type CreateMilePayloadMileEdgeArgs = {
  orderBy?: Maybe<Array<MilesOrderBy>>
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>,
};

/** All input for the `deleteJob` mutation. */
export type DeleteJobInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
};

/** The output of our delete `Job` mutation. */
export type DeleteJobPayload = {
   __typename: 'DeleteJobPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  deletedJobNodeId?: Maybe<Scalars['ID']>,
  /** The `Job` that was deleted by this mutation. */
  job?: Maybe<Job>,
  /** An edge for our `Job`. May be used by Relay 1. */
  jobEdge?: Maybe<JobsEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Job`. */
  user?: Maybe<User>,
};


/** The output of our delete `Job` mutation. */
export type DeleteJobPayloadJobEdgeArgs = {
  orderBy?: Maybe<Array<JobsOrderBy>>
};

/** All input for the `deleteMile` mutation. */
export type DeleteMileInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
};

/** The output of our delete `Mile` mutation. */
export type DeleteMilePayload = {
   __typename: 'DeleteMilePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  deletedMileNodeId?: Maybe<Scalars['ID']>,
  /** The `Mile` that was deleted by this mutation. */
  mile?: Maybe<Mile>,
  /** An edge for our `Mile`. May be used by Relay 1. */
  mileEdge?: Maybe<MilesEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Mile`. */
  user?: Maybe<User>,
};


/** The output of our delete `Mile` mutation. */
export type DeleteMilePayloadMileEdgeArgs = {
  orderBy?: Maybe<Array<MilesOrderBy>>
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>,
};

export type Job = {
   __typename: 'Job',
  createdAt?: Maybe<Scalars['Datetime']>,
  id: Scalars['UUID'],
  notes?: Maybe<Scalars['String']>,
  paymentStatus: PayStatus,
  progress?: Maybe<Scalars['String']>,
  recievedOn: Scalars['Datetime'],
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Reads a single `User` that is related to this `Job`. */
  user?: Maybe<User>,
  userId?: Maybe<Scalars['UUID']>,
};

/** A condition to be used against `Job` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type JobCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `notes` field. */
  notes?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `paymentStatus` field. */
  paymentStatus?: Maybe<PayStatus>,
  /** Checks for equality with the object’s `progress` field. */
  progress?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `recievedOn` field. */
  recievedOn?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>,
};

/** A filter to be used against `Job` object types. All fields are combined with a logical ‘and.’ */
export type JobFilter = {
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<JobFilter>>,
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Negates the expression. */
  not?: Maybe<JobFilter>,
  /** Filter by the object’s `notes` field. */
  notes?: Maybe<StringFilter>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<JobFilter>>,
  /** Filter by the object’s `paymentStatus` field. */
  paymentStatus?: Maybe<PayStatusFilter>,
  /** Filter by the object’s `progress` field. */
  progress?: Maybe<StringFilter>,
  /** Filter by the object’s `recievedOn` field. */
  recievedOn?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `user` relation. */
  user?: Maybe<UserFilter>,
  /** A related `user` exists. */
  userExists?: Maybe<Scalars['Boolean']>,
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>,
};

/** An input for mutations affecting `Job` */
export type JobInput = {
  createdAt?: Maybe<Scalars['Datetime']>,
  id?: Maybe<Scalars['UUID']>,
  notes?: Maybe<Scalars['String']>,
  paymentStatus?: Maybe<PayStatus>,
  progress?: Maybe<Scalars['String']>,
  recievedOn?: Maybe<Scalars['Datetime']>,
  updatedAt?: Maybe<Scalars['Datetime']>,
  userId?: Maybe<Scalars['UUID']>,
};

/** Represents an update to a `Job`. Fields that are set will be updated. */
export type JobPatch = {
  createdAt?: Maybe<Scalars['Datetime']>,
  id?: Maybe<Scalars['UUID']>,
  notes?: Maybe<Scalars['String']>,
  paymentStatus?: Maybe<PayStatus>,
  progress?: Maybe<Scalars['String']>,
  recievedOn?: Maybe<Scalars['Datetime']>,
  updatedAt?: Maybe<Scalars['Datetime']>,
  userId?: Maybe<Scalars['UUID']>,
};

/** A connection to a list of `Job` values. */
export type JobsConnection = {
   __typename: 'JobsConnection',
  /** A list of edges which contains the `Job` and cursor to aid in pagination. */
  edges: Array<JobsEdge>,
  /** A list of `Job` objects. */
  nodes: Array<Job>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `Job` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `Job` edge in the connection. */
export type JobsEdge = {
   __typename: 'JobsEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `Job` at the end of the edge. */
  node: Job,
};

/** Methods to use when ordering `Job`. */
export enum JobsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NotesAsc = 'NOTES_ASC',
  NotesDesc = 'NOTES_DESC',
  PaymentStatusAsc = 'PAYMENT_STATUS_ASC',
  PaymentStatusDesc = 'PAYMENT_STATUS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProgressAsc = 'PROGRESS_ASC',
  ProgressDesc = 'PROGRESS_DESC',
  RecievedOnAsc = 'RECIEVED_ON_ASC',
  RecievedOnDesc = 'RECIEVED_ON_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}


export type Mile = {
   __typename: 'Mile',
  createdAt?: Maybe<Scalars['Datetime']>,
  date: Scalars['Datetime'],
  distance: Scalars['Int'],
  id: Scalars['UUID'],
  info: Scalars['String'],
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Reads a single `User` that is related to this `Mile`. */
  user?: Maybe<User>,
  userId?: Maybe<Scalars['UUID']>,
};

/** A condition to be used against `Mile` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MileCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `date` field. */
  date?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `distance` field. */
  distance?: Maybe<Scalars['Int']>,
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `info` field. */
  info?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>,
};

/** A filter to be used against `Mile` object types. All fields are combined with a logical ‘and.’ */
export type MileFilter = {
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MileFilter>>,
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `date` field. */
  date?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `distance` field. */
  distance?: Maybe<IntFilter>,
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Filter by the object’s `info` field. */
  info?: Maybe<StringFilter>,
  /** Negates the expression. */
  not?: Maybe<MileFilter>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MileFilter>>,
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `user` relation. */
  user?: Maybe<UserFilter>,
  /** A related `user` exists. */
  userExists?: Maybe<Scalars['Boolean']>,
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>,
};

/** An input for mutations affecting `Mile` */
export type MileInput = {
  createdAt?: Maybe<Scalars['Datetime']>,
  date?: Maybe<Scalars['Datetime']>,
  distance: Scalars['Int'],
  id?: Maybe<Scalars['UUID']>,
  info: Scalars['String'],
  updatedAt?: Maybe<Scalars['Datetime']>,
  userId?: Maybe<Scalars['UUID']>,
};

/** Represents an update to a `Mile`. Fields that are set will be updated. */
export type MilePatch = {
  createdAt?: Maybe<Scalars['Datetime']>,
  date?: Maybe<Scalars['Datetime']>,
  distance?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['UUID']>,
  info?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['Datetime']>,
  userId?: Maybe<Scalars['UUID']>,
};

/** A connection to a list of `Mile` values. */
export type MilesConnection = {
   __typename: 'MilesConnection',
  /** A list of edges which contains the `Mile` and cursor to aid in pagination. */
  edges: Array<MilesEdge>,
  /** A list of `Mile` objects. */
  nodes: Array<Mile>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `Mile` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `Mile` edge in the connection. */
export type MilesEdge = {
   __typename: 'MilesEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `Mile` at the end of the edge. */
  node: Mile,
};

/** Methods to use when ordering `Mile`. */
export enum MilesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  DistanceAsc = 'DISTANCE_ASC',
  DistanceDesc = 'DISTANCE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InfoAsc = 'INFO_ASC',
  InfoDesc = 'INFO_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
   __typename: 'Mutation',
  /** Creates a JWT token that will securely identify a user and give them certain permissions. */
  authenticate?: Maybe<AuthenticatePayload>,
  /** Creates a single `Job`. */
  createJob?: Maybe<CreateJobPayload>,
  /** Creates a single `Mile`. */
  createMile?: Maybe<CreateMilePayload>,
  /** Deletes a single `Job` using a unique key. */
  deleteJob?: Maybe<DeleteJobPayload>,
  /** Deletes a single `Mile` using a unique key. */
  deleteMile?: Maybe<DeleteMilePayload>,
  /** Registers a single user and creates an account in our app. */
  registerUser?: Maybe<RegisterUserPayload>,
  /** Updates a single `Job` using a unique key and a patch. */
  updateJob?: Maybe<UpdateJobPayload>,
  /** Updates a single `Mile` using a unique key and a patch. */
  updateMile?: Maybe<UpdateMilePayload>,
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>,
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJobArgs = {
  input: CreateJobInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMileArgs = {
  input: CreateMileInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJobArgs = {
  input: DeleteJobInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMileArgs = {
  input: DeleteMileInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJobArgs = {
  input: UpdateJobInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMileArgs = {
  input: UpdateMileInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput
};

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename: 'PageInfo',
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>,
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>,
};

export enum PayStatus {
  Cancelled = 'CANCELLED',
  Invoiced = 'INVOICED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Waiting = 'WAITING'
}

/** A filter to be used against PayStatus fields. All fields are combined with a logical ‘and.’ */
export type PayStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<PayStatus>,
  /** Equal to the specified value. */
  equalTo?: Maybe<PayStatus>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<PayStatus>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<PayStatus>,
  /** Included in the specified list. */
  in?: Maybe<Array<PayStatus>>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<PayStatus>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<PayStatus>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<PayStatus>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<PayStatus>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<PayStatus>>,
};

/** The root query type which gives access points into the data universe. */
export type Query = {
   __typename: 'Query',
  /** Gets the user who was identified by our JWT. */
  currentUser?: Maybe<User>,
  job?: Maybe<Job>,
  /** Reads and enables pagination through a set of `Job`. */
  jobs?: Maybe<JobsConnection>,
  mile?: Maybe<Mile>,
  /** Reads and enables pagination through a set of `Mile`. */
  miles?: Maybe<MilesConnection>,
  /** 
 * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
 */
  query: Query,
  user?: Maybe<User>,
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>,
};


/** The root query type which gives access points into the data universe. */
export type QueryJobArgs = {
  id: Scalars['UUID']
};


/** The root query type which gives access points into the data universe. */
export type QueryJobsArgs = {
  after?: Maybe<Scalars['Cursor']>,
  before?: Maybe<Scalars['Cursor']>,
  condition?: Maybe<JobCondition>,
  filter?: Maybe<JobFilter>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<JobsOrderBy>>
};


/** The root query type which gives access points into the data universe. */
export type QueryMileArgs = {
  id: Scalars['UUID']
};


/** The root query type which gives access points into the data universe. */
export type QueryMilesArgs = {
  after?: Maybe<Scalars['Cursor']>,
  before?: Maybe<Scalars['Cursor']>,
  condition?: Maybe<MileCondition>,
  filter?: Maybe<MileFilter>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<MilesOrderBy>>
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID']
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: Maybe<Scalars['Cursor']>,
  before?: Maybe<Scalars['Cursor']>,
  condition?: Maybe<UserCondition>,
  filter?: Maybe<UserFilter>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<UsersOrderBy>>
};

/** All input for the `registerUser` mutation. */
export type RegisterUserInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  jobTitle: Scalars['String'],
  lastName: Scalars['String'],
  password: Scalars['String'],
};

/** The output of our `registerUser` mutation. */
export type RegisterUserPayload = {
   __typename: 'RegisterUserPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  user?: Maybe<User>,
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>,
};


/** The output of our `registerUser` mutation. */
export type RegisterUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>,
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>,
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>,
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>,
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>,
  /** 
 * Matches the specified pattern (case-sensitive). An underscore (_) matches any
   * single character; a percent sign (%) matches any sequence of zero or more characters.
 */
  like?: Maybe<Scalars['String']>,
  /** 
 * Matches the specified pattern (case-insensitive). An underscore (_) matches
   * any single character; a percent sign (%) matches any sequence of zero or more characters.
 */
  likeInsensitive?: Maybe<Scalars['String']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>,
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>,
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>,
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>,
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>,
  /** 
 * Does not match the specified pattern (case-sensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
 */
  notLike?: Maybe<Scalars['String']>,
  /** 
 * Does not match the specified pattern (case-insensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
 */
  notLikeInsensitive?: Maybe<Scalars['String']>,
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['String']>,
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>,
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>,
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['String']>,
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>,
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>,
};

/** All input for the `updateJob` mutation. */
export type UpdateJobInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
  /** An object where the defined keys will be set on the `Job` being updated. */
  patch: JobPatch,
};

/** The output of our update `Job` mutation. */
export type UpdateJobPayload = {
   __typename: 'UpdateJobPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Job` that was updated by this mutation. */
  job?: Maybe<Job>,
  /** An edge for our `Job`. May be used by Relay 1. */
  jobEdge?: Maybe<JobsEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Job`. */
  user?: Maybe<User>,
};


/** The output of our update `Job` mutation. */
export type UpdateJobPayloadJobEdgeArgs = {
  orderBy?: Maybe<Array<JobsOrderBy>>
};

/** All input for the `updateMile` mutation. */
export type UpdateMileInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
  /** An object where the defined keys will be set on the `Mile` being updated. */
  patch: MilePatch,
};

/** The output of our update `Mile` mutation. */
export type UpdateMilePayload = {
   __typename: 'UpdateMilePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Mile` that was updated by this mutation. */
  mile?: Maybe<Mile>,
  /** An edge for our `Mile`. May be used by Relay 1. */
  mileEdge?: Maybe<MilesEdge>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** Reads a single `User` that is related to this `Mile`. */
  user?: Maybe<User>,
};


/** The output of our update `Mile` mutation. */
export type UpdateMilePayloadMileEdgeArgs = {
  orderBy?: Maybe<Array<MilesOrderBy>>
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The primary unique identifier for the user. */
  id: Scalars['UUID'],
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch,
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
   __typename: 'UpdateUserPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>,
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>,
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>
};

export type User = {
   __typename: 'User',
  /** The time this user was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** The users first name. */
  firstName: Scalars['String'],
  /** A persons full name which is a concatenation of their first and last name. */
  fullName?: Maybe<Scalars['String']>,
  /** The primary unique identifier for the user. */
  id: Scalars['UUID'],
  /** A boolean for admin status */
  isAdmin?: Maybe<Scalars['Boolean']>,
  /** Reads and enables pagination through a set of `Job`. */
  jobs: JobsConnection,
  /** A short description about the user. */
  jobTitle?: Maybe<Scalars['String']>,
  /** The users last name. */
  lastName?: Maybe<Scalars['String']>,
  /** Reads and enables pagination through a set of `Mile`. */
  miles: MilesConnection,
  updatedAt?: Maybe<Scalars['Datetime']>,
};


export type UserJobsArgs = {
  after?: Maybe<Scalars['Cursor']>,
  before?: Maybe<Scalars['Cursor']>,
  condition?: Maybe<JobCondition>,
  filter?: Maybe<JobFilter>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<JobsOrderBy>>
};


export type UserMilesArgs = {
  after?: Maybe<Scalars['Cursor']>,
  before?: Maybe<Scalars['Cursor']>,
  condition?: Maybe<MileCondition>,
  filter?: Maybe<MileFilter>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<Array<MilesOrderBy>>
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `isAdmin` field. */
  isAdmin?: Maybe<Scalars['Boolean']>,
  /** Checks for equality with the object’s `jobTitle` field. */
  jobTitle?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>,
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>,
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `firstName` field. */
  firstName?: Maybe<StringFilter>,
  /** Filter by the object’s `fullName` field. */
  fullName?: Maybe<StringFilter>,
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Filter by the object’s `isAdmin` field. */
  isAdmin?: Maybe<BooleanFilter>,
  /** Filter by the object’s `jobs` relation. */
  jobs?: Maybe<UserToManyJobFilter>,
  /** Some related `jobs` exist. */
  jobsExist?: Maybe<Scalars['Boolean']>,
  /** Filter by the object’s `jobTitle` field. */
  jobTitle?: Maybe<StringFilter>,
  /** Filter by the object’s `lastName` field. */
  lastName?: Maybe<StringFilter>,
  /** Filter by the object’s `miles` relation. */
  miles?: Maybe<UserToManyMileFilter>,
  /** Some related `miles` exist. */
  milesExist?: Maybe<Scalars['Boolean']>,
  /** Negates the expression. */
  not?: Maybe<UserFilter>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>,
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>,
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** The time this user was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** The users first name. */
  firstName?: Maybe<Scalars['String']>,
  /** The primary unique identifier for the user. */
  id?: Maybe<Scalars['UUID']>,
  /** A boolean for admin status */
  isAdmin?: Maybe<Scalars['Boolean']>,
  /** A short description about the user. */
  jobTitle?: Maybe<Scalars['String']>,
  /** The users last name. */
  lastName?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['Datetime']>,
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
   __typename: 'UsersConnection',
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>,
  /** A list of `User` objects. */
  nodes: Array<User>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `User` edge in the connection. */
export type UsersEdge = {
   __typename: 'UsersEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `User` at the end of the edge. */
  node: User,
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsAdminAsc = 'IS_ADMIN_ASC',
  IsAdminDesc = 'IS_ADMIN_DESC',
  JobTitleAsc = 'JOB_TITLE_ASC',
  JobTitleDesc = 'JOB_TITLE_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against many `Job` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyJobFilter = {
  /** Every related `Job` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<JobFilter>,
  /** No related `Job` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<JobFilter>,
  /** Some related `Job` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<JobFilter>,
};

/** A filter to be used against many `Mile` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyMileFilter = {
  /** Every related `Mile` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MileFilter>,
  /** No related `Mile` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MileFilter>,
  /** Some related `Mile` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MileFilter>,
};


/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>,
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>,
};

export type JobInfoFragment = (
  { __typename: 'Job' }
  & Pick<Job, 'createdAt' | 'id' | 'notes' | 'paymentStatus' | 'progress' | 'recievedOn' | 'updatedAt'>
);

export type MileInfoFragment = (
  { __typename: 'Mile' }
  & Pick<Mile, 'createdAt' | 'date' | 'distance' | 'id' | 'info' | 'updatedAt' | 'userId'>
);

export type UserMilesFragment = (
  { __typename: 'User' }
  & { miles: (
    { __typename: 'MilesConnection' }
    & { nodes: Array<(
      { __typename: 'Mile' }
      & MileInfoFragment
    )> }
  ) }
);

export type UserJobsFragment = (
  { __typename: 'User' }
  & { jobs: (
    { __typename: 'JobsConnection' }
    & { nodes: Array<(
      { __typename: 'Job' }
      & JobInfoFragment
    )> }
  ) }
);

export type UserInfoFragment = (
  { __typename: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'jobTitle' | 'fullName' | 'isAdmin'>
);

export type RegisterUserMutationVariables = {
  user: RegisterUserInput
};


export type RegisterUserMutation = (
  { __typename: 'Mutation' }
  & { registerUser: Maybe<(
    { __typename: 'RegisterUserPayload' }
    & { user: Maybe<(
      { __typename: 'User' }
      & UserInfoFragment
    )> }
  )> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename: 'Query' }
  & { currentUser: Maybe<(
    { __typename: 'User' }
    & UserInfoFragment
    & UserMilesFragment
    & UserJobsFragment
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename: 'Query' }
  & { users: Maybe<(
    { __typename: 'UsersConnection' }
    & { nodes: Array<(
      { __typename: 'User' }
      & UserInfoFragment
    )> }
  )> }
);

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename: 'Mutation' }
  & { authenticate: Maybe<(
    { __typename: 'AuthenticatePayload' }
    & Pick<AuthenticatePayload, 'jwtToken'>
  )> }
);

export type AddMileMutationVariables = {
  mile: MileInput
};


export type AddMileMutation = (
  { __typename: 'Mutation' }
  & { createMile: Maybe<(
    { __typename: 'CreateMilePayload' }
    & { mile: Maybe<(
      { __typename: 'Mile' }
      & MileInfoFragment
    )> }
  )> }
);

export type DeleteMileMutationVariables = {
  id: Scalars['UUID']
};


export type DeleteMileMutation = (
  { __typename: 'Mutation' }
  & { deleteMile: Maybe<(
    { __typename: 'DeleteMilePayload' }
    & { mile: Maybe<(
      { __typename: 'Mile' }
      & MileInfoFragment
    )> }
  )> }
);

export type AddJobMutationVariables = {
  job: JobInput
};


export type AddJobMutation = (
  { __typename: 'Mutation' }
  & { createJob: Maybe<(
    { __typename: 'CreateJobPayload' }
    & { job: Maybe<(
      { __typename: 'Job' }
      & JobInfoFragment
    )> }
  )> }
);

export type DeleteJobMutationVariables = {
  id: Scalars['UUID']
};


export type DeleteJobMutation = (
  { __typename: 'Mutation' }
  & { deleteJob: Maybe<(
    { __typename: 'DeleteJobPayload' }
    & { job: Maybe<(
      { __typename: 'Job' }
      & JobInfoFragment
    )> }
  )> }
);

export type OpenJobsQueryVariables = {};


export type OpenJobsQuery = (
  { __typename: 'Query' }
  & { jobs: Maybe<(
    { __typename: 'JobsConnection' }
    & { nodes: Array<(
      { __typename: 'Job' }
      & JobInfoFragment
    )> }
  )> }
);

export const MileInfoFragmentDoc = gql`
    fragment MileInfo on Mile {
  createdAt
  date
  distance
  id
  info
  updatedAt
  userId
}
    `;
export const UserMilesFragmentDoc = gql`
    fragment UserMiles on User {
  miles {
    nodes {
      ...MileInfo
    }
  }
}
    ${MileInfoFragmentDoc}`;
export const JobInfoFragmentDoc = gql`
    fragment JobInfo on Job {
  createdAt
  id
  notes
  paymentStatus
  progress
  recievedOn
  updatedAt
}
    `;
export const UserJobsFragmentDoc = gql`
    fragment UserJobs on User {
  jobs {
    nodes {
      ...JobInfo
    }
  }
}
    ${JobInfoFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  firstName
  lastName
  jobTitle
  fullName
  isAdmin
}
    `;
export const RegisterUserDocument = gql`
    mutation RegisterUser($user: RegisterUserInput!) {
  registerUser(input: $user) {
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;
export type RegisterUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterUserMutation, RegisterUserMutationVariables>, 'mutation'>;

    export const RegisterUserComponent = (props: RegisterUserComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterUserMutation, RegisterUserMutationVariables> mutation={RegisterUserDocument} {...props} />
    );
    

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...UserInfo
    ...UserMiles
    ...UserJobs
  }
}
    ${UserInfoFragmentDoc}
${UserMilesFragmentDoc}
${UserJobsFragmentDoc}`;
export type CurrentUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CurrentUserQuery, CurrentUserQueryVariables>, 'query'>;

    export const CurrentUserComponent = (props: CurrentUserComponentProps) => (
      <ApolloReactComponents.Query<CurrentUserQuery, CurrentUserQueryVariables> query={CurrentUserDocument} {...props} />
    );
    

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    nodes {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'>;

    export const UsersComponent = (props: UsersComponentProps) => (
      <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
    );
    

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    jwtToken
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignInMutation, SignInMutationVariables>, 'mutation'>;

    export const SignInComponent = (props: SignInComponentProps) => (
      <ApolloReactComponents.Mutation<SignInMutation, SignInMutationVariables> mutation={SignInDocument} {...props} />
    );
    

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const AddMileDocument = gql`
    mutation addMile($mile: MileInput!) {
  createMile(input: {mile: $mile}) {
    mile {
      ...MileInfo
    }
  }
}
    ${MileInfoFragmentDoc}`;
export type AddMileMutationFn = ApolloReactCommon.MutationFunction<AddMileMutation, AddMileMutationVariables>;
export type AddMileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMileMutation, AddMileMutationVariables>, 'mutation'>;

    export const AddMileComponent = (props: AddMileComponentProps) => (
      <ApolloReactComponents.Mutation<AddMileMutation, AddMileMutationVariables> mutation={AddMileDocument} {...props} />
    );
    

/**
 * __useAddMileMutation__
 *
 * To run a mutation, you first call `useAddMileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMileMutation, { data, loading, error }] = useAddMileMutation({
 *   variables: {
 *      mile: // value for 'mile'
 *   },
 * });
 */
export function useAddMileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMileMutation, AddMileMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMileMutation, AddMileMutationVariables>(AddMileDocument, baseOptions);
      }
export type AddMileMutationHookResult = ReturnType<typeof useAddMileMutation>;
export type AddMileMutationResult = ApolloReactCommon.MutationResult<AddMileMutation>;
export type AddMileMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMileMutation, AddMileMutationVariables>;
export const DeleteMileDocument = gql`
    mutation deleteMile($id: UUID!) {
  deleteMile(input: {id: $id}) {
    mile {
      ...MileInfo
    }
  }
}
    ${MileInfoFragmentDoc}`;
export type DeleteMileMutationFn = ApolloReactCommon.MutationFunction<DeleteMileMutation, DeleteMileMutationVariables>;
export type DeleteMileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMileMutation, DeleteMileMutationVariables>, 'mutation'>;

    export const DeleteMileComponent = (props: DeleteMileComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMileMutation, DeleteMileMutationVariables> mutation={DeleteMileDocument} {...props} />
    );
    

/**
 * __useDeleteMileMutation__
 *
 * To run a mutation, you first call `useDeleteMileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMileMutation, { data, loading, error }] = useDeleteMileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMileMutation, DeleteMileMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMileMutation, DeleteMileMutationVariables>(DeleteMileDocument, baseOptions);
      }
export type DeleteMileMutationHookResult = ReturnType<typeof useDeleteMileMutation>;
export type DeleteMileMutationResult = ApolloReactCommon.MutationResult<DeleteMileMutation>;
export type DeleteMileMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMileMutation, DeleteMileMutationVariables>;
export const AddJobDocument = gql`
    mutation addJob($job: JobInput!) {
  createJob(input: {job: $job}) {
    job {
      ...JobInfo
    }
  }
}
    ${JobInfoFragmentDoc}`;
export type AddJobMutationFn = ApolloReactCommon.MutationFunction<AddJobMutation, AddJobMutationVariables>;
export type AddJobComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddJobMutation, AddJobMutationVariables>, 'mutation'>;

    export const AddJobComponent = (props: AddJobComponentProps) => (
      <ApolloReactComponents.Mutation<AddJobMutation, AddJobMutationVariables> mutation={AddJobDocument} {...props} />
    );
    

/**
 * __useAddJobMutation__
 *
 * To run a mutation, you first call `useAddJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addJobMutation, { data, loading, error }] = useAddJobMutation({
 *   variables: {
 *      job: // value for 'job'
 *   },
 * });
 */
export function useAddJobMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddJobMutation, AddJobMutationVariables>) {
        return ApolloReactHooks.useMutation<AddJobMutation, AddJobMutationVariables>(AddJobDocument, baseOptions);
      }
export type AddJobMutationHookResult = ReturnType<typeof useAddJobMutation>;
export type AddJobMutationResult = ApolloReactCommon.MutationResult<AddJobMutation>;
export type AddJobMutationOptions = ApolloReactCommon.BaseMutationOptions<AddJobMutation, AddJobMutationVariables>;
export const DeleteJobDocument = gql`
    mutation deleteJob($id: UUID!) {
  deleteJob(input: {id: $id}) {
    job {
      ...JobInfo
    }
  }
}
    ${JobInfoFragmentDoc}`;
export type DeleteJobMutationFn = ApolloReactCommon.MutationFunction<DeleteJobMutation, DeleteJobMutationVariables>;
export type DeleteJobComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteJobMutation, DeleteJobMutationVariables>, 'mutation'>;

    export const DeleteJobComponent = (props: DeleteJobComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteJobMutation, DeleteJobMutationVariables> mutation={DeleteJobDocument} {...props} />
    );
    

/**
 * __useDeleteJobMutation__
 *
 * To run a mutation, you first call `useDeleteJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobMutation, { data, loading, error }] = useDeleteJobMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJobMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteJobMutation, DeleteJobMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument, baseOptions);
      }
export type DeleteJobMutationHookResult = ReturnType<typeof useDeleteJobMutation>;
export type DeleteJobMutationResult = ApolloReactCommon.MutationResult<DeleteJobMutation>;
export type DeleteJobMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteJobMutation, DeleteJobMutationVariables>;
export const OpenJobsDocument = gql`
    query OpenJobs {
  jobs(filter: {userId: {isNull: true}}) {
    nodes {
      ...JobInfo
    }
  }
}
    ${JobInfoFragmentDoc}`;
export type OpenJobsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<OpenJobsQuery, OpenJobsQueryVariables>, 'query'>;

    export const OpenJobsComponent = (props: OpenJobsComponentProps) => (
      <ApolloReactComponents.Query<OpenJobsQuery, OpenJobsQueryVariables> query={OpenJobsDocument} {...props} />
    );
    

/**
 * __useOpenJobsQuery__
 *
 * To run a query within a React component, call `useOpenJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpenJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpenJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpenJobsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OpenJobsQuery, OpenJobsQueryVariables>) {
        return ApolloReactHooks.useQuery<OpenJobsQuery, OpenJobsQueryVariables>(OpenJobsDocument, baseOptions);
      }
export function useOpenJobsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OpenJobsQuery, OpenJobsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OpenJobsQuery, OpenJobsQueryVariables>(OpenJobsDocument, baseOptions);
        }
export type OpenJobsQueryHookResult = ReturnType<typeof useOpenJobsQuery>;
export type OpenJobsLazyQueryHookResult = ReturnType<typeof useOpenJobsLazyQuery>;
export type OpenJobsQueryResult = ApolloReactCommon.QueryResult<OpenJobsQuery, OpenJobsQueryVariables>;