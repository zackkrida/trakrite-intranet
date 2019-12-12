import { Page } from '../components/Page'
import { OpenJobs } from '../components/OpenJobs'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'

const Jobs = () => (
  <Page>
    {({ currentUser }) => (
      <Card>
        <Stack space="small">
          <h1>Open Jobs</h1>
          <OpenJobs user={currentUser} />
        </Stack>
      </Card>
    )}
  </Page>
)

export default withApollo(Jobs)
