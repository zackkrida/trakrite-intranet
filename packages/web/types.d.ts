import { NormalizedCache } from 'apollo-cache-inmemory'
import { NextPageContext } from 'next'
declare interface ApolloPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCache>
}

type CreationOptions = 'INACTIVE' | 'ACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS'
