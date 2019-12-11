import { Page } from '../components/Page'
import { UserMiles } from '../components/UserMiles'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'

const Miles = () => (
  <Page>
    {({ currentUser }) => (
      <Card>
        <Stack space="small">
          <h1>My Mileage</h1>
          {currentUser ? <UserMiles user={currentUser} /> : <p>Uh oh.</p>}
        </Stack>
      </Card>
    )}
  </Page>
)

export default withApollo(Miles)
