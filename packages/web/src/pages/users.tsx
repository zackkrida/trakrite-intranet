import { Page } from '../components/Page'
import { UserList } from '../components/UserList'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'

const Users = () => (
  <Page>
    {({ currentUser }) => (
      <Card>
        <Stack space="small">
          <h1>Manage Users</h1>
          {currentUser ? <UserList /> : <p>Uh oh.</p>}
        </Stack>
      </Card>
    )}
  </Page>
)

export default withApollo(Users)
