import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'
import { Card } from '../components/Card'
import { SignInBox } from '../components/SignInBox'
import { UserList } from '../components/UserList'
import { UserInfoFragment, UserMilesFragment } from '@trakrite/queries'
import { Row } from '../components/Row'
import { Stack } from '../components/Stack'
import { UserMiles } from '../components/UserMiles'
import { UserJobs } from '../components/UserJobs'
import Link from 'next/link'

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
        <div style={{ width: '500px', maxWidth: '100%', margin: '0 auto' }}>
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

const UserView = ({ user }: { user: UserInfoFragment & UserMilesFragment }) => (
  <Row expandItems={true}>
    <Card>
      <Stack space="medium">
        <h1>Trakrite Intranet</h1>
        <p>Welcome {user.fullName}</p>
      </Stack>
    </Card>
    <Card>
      <h1>Open Jobs</h1>
    </Card>
    <Card>
      <Stack space="small">
        <h1>My Jobs</h1>
        <UserJobs user={user} limit={5} />
      </Stack>
    </Card>
    <Card>
      <Stack space="small">
        <h1>
          <Link href="/miles">
            <a>My Miles</a>
          </Link>
        </h1>
        <UserMiles user={user} limit={5} />
      </Stack>
    </Card>
  </Row>
)

const AdminView = ({
  user,
}: {
  user: UserInfoFragment & UserMilesFragment
}) => (
  <Row expandItems={true}>
    <Card>
      <h1>Trakrite Intranet</h1>
      <p>Welcome {user.fullName}</p>
    </Card>

    <Card>
      <h2>Manage Users</h2>
      <UserList />
    </Card>
  </Row>
)

export default withApollo(Home)
