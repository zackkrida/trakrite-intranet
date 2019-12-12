import { Page } from '../components/Page'
import { UserJobs } from '../components/UserJobs'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'

const Jobs = () => (
  <Page>
    {({ currentUser }) => (
      <Card>
        <Stack space="small">
          <h1>My Jobs</h1>
          {currentUser ? <UserJobs user={currentUser} /> : <p>Uh oh.</p>}
        </Stack>
      </Card>
    )}
  </Page>
)

export default withApollo(Jobs)
