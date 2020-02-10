import { NormalizedCache } from 'apollo-cache-inmemory'
import { NextPageContext } from 'next'
import {
  UserInfoFragment,
  UserMilesFragment,
  UserJobsFragment,
  UserHoursFragment,
} from '@trakrite/queries'

declare interface ApolloPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCache>
}

type CreationOptions = 'INACTIVE' | 'ACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS'

type AppUser = UserInfoFragment &
  UserMilesFragment &
  UserJobsFragment &
  UserHoursFragment
