import '@reach/dialog/styles.css'
import Link from 'next/link'
import cookie from 'cookie'
import redirect from '../lib/redirect'
import {
  useCurrentUserQuery,
  UserInfoFragment,
  UserMilesFragment,
} from '@trakrite/queries'
import { useApolloClient } from '@apollo/react-hooks'

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
        <a>trakrite</a>
      </Link>
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
        }

        nav ul li {
          display: block;
          padding: 0 0.5em;
        }

        header {
          padding: 1em;
          background-color: #fff;
          box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        }

        li {
          list-style: none;
        }

        li > * {
          display: block;
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
    &copy; 2019-{new Date().getFullYear()} Trakrite Global. All Rights Reserved.
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

type CurrentUserType = (UserInfoFragment & UserMilesFragment) | null | undefined
