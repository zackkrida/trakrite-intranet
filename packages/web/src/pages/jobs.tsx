import { Page } from '../components/Page'
import { UserJobs } from '../components/UserJobs'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'
import { JobList } from '../components/JobList'

const Jobs = () => (
  <Page>
    {({ currentUser }) =>
      currentUser ? (
        <Card>
          <Stack space="small">
            <h1>All {currentUser.isAdmin ? 'Jobs' : 'My Jobs'}</h1>
            {currentUser.isAdmin ? (
              <JobList />
            ) : (
              <UserJobs user={currentUser} />
            )}
          </Stack>
        </Card>
      ) : null
    }
  </Page>
)

export default withApollo(Jobs)
