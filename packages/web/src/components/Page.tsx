import Link from 'next/link'

const Header = () => (
  <header>
    <Link href="/">
      <a>trakrite</a>
    </Link>
    <nav>
      <ul>
        <li>
          <Link href="/about">
            <a>one</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>two</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>three</a>
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      header,
      nav ul {
        display: flex;
        justify-content: space-between;
      }

      li {
        list-style: none;
      }

      a {
        display: block;
        padding: 1em;
      }
    `}</style>
  </header>
)

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
    &copy; 2019-{new Date().getFullYear()}. All Rights Reserved.
    <style jsx>{`
      footer {
        padding: 1em;
        text-align: center;
      }
    `}</style>
  </footer>
)

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app">
      <Header />
      <Main children={children} />
      <Footer />
      <style jsx global>{`
        *,
        *:before,
        *:after {
          margin: 0;
          padding: 0;
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
