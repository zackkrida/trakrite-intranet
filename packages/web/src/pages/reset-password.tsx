import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'
import { Card } from '../components/Card'
import { PasswordResetBox } from '../components/PasswordResetBox'
import { useState } from 'react'

const SignIn = () => {
  return (
    <Page>
      <div style={{ width: '500px', margin: '0 auto', maxWidth: '100%' }}>
        <Card>
          <h1>Reset Password</h1>
          <p>Enter your account email and we&apos;ll send you a reset link.</p>
          <PasswordResetBox />
        </Card>
      </div>
    </Page>
  )
}

export default withApollo(SignIn)
