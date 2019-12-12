import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'
import { Card } from '../components/Card'
import { SignInBox } from '../components/SignInBox'
import { UserList } from '../components/UserList'
import {
  UserInfoFragment,
  UserMilesFragment,
  UserJobsFragment,
} from '@trakrite/queries'
import { Row } from '../components/Row'
import { Stack } from '../components/Stack'
import { UserView } from '../components/UserView'
import { AdminView } from '../components/AdminView'

const Home = () => (
  <Page>
    {({ currentUser }) =>
      currentUser ? (
        currentUser.isAdmin ? (
          <AdminView user={currentUser} />
        ) : (
          <UserView user={currentUser} />
        )
      ) : (
        <div
          style={{
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            margin: '0 auto',
          }}
        >
          <Card>
            <Stack space="small">
              <h1>Welcome to the Trakrite Intranet</h1>
              <p>Please sign in to continue.</p>
              <SignInBox />
            </Stack>
          </Card>
        </div>
      )
    }
  </Page>
)

export default withApollo(Home)
