import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { SignInBox } from '../components/SignInBox'

const SignIn = () => (
  <Page>
    <div
      style={{
        width: '400px',
        maxWidth: 'calc(100vw - 32px)',
        margin: '0 auto',
      }}
    >
      <Card>
        <Stack space="small">
          <h1>Sign In</h1>
          <p>
            Sign into the TrakRite Internal Dashboard with your existing
            account.
          </p>
          <SignInBox />
        </Stack>
      </Card>
    </div>
  </Page>
)

export default withApollo(SignIn)
