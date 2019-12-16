// Styles
import '@reach/dialog/styles.css'
import 'toasted-notes/src/styles.css'

import Link from 'next/link'
import cookie from 'cookie'
import redirect from '../lib/redirect'
import {
  useCurrentUserQuery,
  UserInfoFragment,
  UserMilesFragment,
  UserJobsFragment,
} from '@trakrite/queries'
import { useApolloClient } from '@apollo/react-hooks'
import Head from 'next/head'

const Header = ({ currentUser }: { currentUser: CurrentUserType }) => {
  const client = useApolloClient()

  const handleLogout = () => {
    // Expire the cookie
    document.cookie = cookie.serialize('tokennnn', '', { maxAge: -1 })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    client.resetStore().then(() => {
      redirect(null, '/')
    })
  }

  return (
    <header>
      <Link href="/">
        <a>TrakRite</a>
      </Link>

      {currentUser && (
        <nav className="menu">
          <ul>
            <li>
              <Link href="/">
                <a style={{ display: 'flex', alignItems: 'middle' }}>
                  <svg
                    viewBox="0 0 495.398 495.398"
                    style={{ width: '16px', marginRight: '4px', fill: '#fff' }}
                  >
                    <path
                      d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
				v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
				c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
				c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"
                    />
                    <path
                      d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
				c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
				c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"
                    />
                  </svg>
                  Home
                </a>
              </Link>
            </li>
            {currentUser.isAdmin && (
              <>
                <li>
                  <Link href="/jobs">
                    <a>My Jobs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/users">
                    <a>Users</a>
                  </Link>
                </li>
              </>
            )}
            {currentUser.isAdmin === false && (
              <>
                <li>
                  <Link href="/jobs">
                    <a>My Jobs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/open-jobs">
                    <a>Find Jobs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/miles">
                    <a>My Miles</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      <nav>
        <ul>
          {currentUser ? (
            <>
              <li>
                <span>Hi {currentUser.firstName}.</span>
              </li>
              <li>
                <a onClick={handleLogout}>Sign Out.</a>
              </li>
            </>
          ) : (
            <Link href="/signin">
              <a>Sign in</a>
            </Link>
          )}
        </ul>
      </nav>
      <style jsx>{`
        header,
        nav ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        nav ul li {
          display: block;
          padding: 0 0.5em;
        }

        nav {
          font-size: 14px;
        }

        header {
          position: sticky;
          top: 0;
          z-index: 20;
          padding: 1em;
          background-color: #183a59;
          color: #fff;
          box-shadow: 0 1px 4px rgba(0, 22, 44, 0.31);
        }

        li {
          list-style: none;
        }

        li > * {
          display: block;
        }

        @media screen and (max-width: 900px) {
          .menu {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #183a59;
            box-shadow: 0 1px 4px rgba(0, 22, 44, 0.31);
            padding: 14px 20px;
          }
        }
      `}</style>
    </header>
  )
}
const Main = ({ children }: { children: React.ReactNode }) => (
  <main>
    {children}
    <style jsx>{`
      main {
        padding: 1em;
      }
    `}</style>
  </main>
)

const Footer = () => (
  <footer>
    &copy; 2019-{new Date().getFullYear()} TrakRite Global. All Rights Reserved.
    <style jsx>{`
      footer {
        font-size: 0.85em;
        padding: 1em;
        text-align: center;
      }
    `}</style>
  </footer>
)

export const Page = ({ children }: LayoutProps) => {
  const { data } = useCurrentUserQuery()
  const currentUser = data?.currentUser

  return (
    <div className="app">
      <Head>
        <link key="manifest" rel="manifest" href="/manifest.json"></link>
      </Head>
      <Header currentUser={currentUser} />
      <Main>
        {typeof children === 'function' ? children({ currentUser }) : children}
      </Main>
      <Footer />
      <style jsx global>{`
        *,
        *:before,
        *:after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          color: rgba(0, 0, 0, 0.65);
          background-color: #f0f2f5;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
            Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
            sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        }

        a {
          color: inherit;
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        a:visited {
          color: inherit;
        }

        a:focus,
        a:hover {
          text-decoration: underline;
        }

        h1 {
          font-size: 1.35rem;
          letter-spacing: -0.4px;
        }

        ul {
          list-style: none;
        }

        hr {
          border: none;
          height: 1px;
          background-color: #e3e3e3;
        }

        [data-reach-dialog-overlay] {
          z-index: 30;
        }

        @media screen and (max-width: 1000px) {
          [data-reach-dialog-content] {
            width: calc(100% - 1.5rem);
            padding: 1.5rem;
          }
        }
      `}</style>

      <style jsx>{`
        .app {
          min-height: 100vh;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }
      `}</style>
    </div>
  )
}

type CurrentUserRenderProp = (props: {
  currentUser: CurrentUserType
}) => React.ReactNode

interface LayoutProps {
  children: React.ReactNode | CurrentUserRenderProp
}

type CurrentUserType =
  | (UserInfoFragment & UserMilesFragment & UserJobsFragment)
  | null
  | undefined
