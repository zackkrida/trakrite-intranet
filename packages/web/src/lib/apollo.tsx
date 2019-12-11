import Head from 'next/head'
import cookie from 'cookie'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { NextPage, NextApiRequest } from 'next'

let apolloClient: null | ApolloClient<NormalizedCacheObject> = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {import('next').NextPage} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: NextPage, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: {
    apolloClient?: ApolloClient<NormalizedCacheObject>
    apolloState?: NormalizedCacheObject
  }) => {
    const client = apolloClient ?? initApolloClient(apolloState, { getToken })

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        {
          getToken: () => getToken(ctx.req),
        }
      ))

      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState = {}, { getToken }) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, { getToken })
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, { getToken })
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, { getToken }) {
  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  })

  const authLink = setContext((request, { headers = {} }) => {
    const token = getToken()
    if (token) headers.authorization = `Bearer ${token}`
    return { headers }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: object => object.id || null,
    }).restore(initialState),
  })
}

/**
 * Get the user token from cookie
 * @param {Object} req
 */
function getToken(req?: NextApiRequest) {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)
  return cookies.tokennnn
}
