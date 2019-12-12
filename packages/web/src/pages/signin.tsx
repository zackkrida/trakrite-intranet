import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'
import { Card } from '../components/Card'
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
        <h1>Sign In</h1>
        <p>Sign into trakrite with your existing account.</p>
        <SignInBox />
      </Card>
    </div>
  </Page>
)

export default withApollo(SignIn)
