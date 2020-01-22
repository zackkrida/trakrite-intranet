import cookie from 'cookie'
import Link from 'next/link'
import { Row } from '../components/Row'
import { Input } from './Input'
import { Button } from './Button'
import { FormEventHandler, useState } from 'react'
import redirect from '../lib/redirect'
import { useSignInMutation } from '@trakrite/queries'
import { useApolloClient } from '@apollo/react-hooks'
import { Stack } from './Stack'

export const SignInBox = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient()
  const [signIn] = useSignInMutation()

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault()

    // Clear existing errors
    if (message) {
      setMessage('')
    }

    try {
      // Remove any existing auth cookies before attempting to sign in. This can prevent isseus where existing logins have expired.
      document.cookie = cookie.serialize('tokennnn', '', { maxAge: -1 })

      const { data, errors } = await signIn({
        variables: {
          email,
          password,
        },
      })

      console.log(data, errors)

      // Clear inputs
      setEmail('')
      setPassword('')

      if (!errors && data?.authenticate?.jwtToken) {
        setMessage('Success. Logging in.')

        // Store the token in cookie
        document.cookie = cookie.serialize(
          'tokennnn',
          data.authenticate.jwtToken,
          {
            maxAge: 30 * 24 * 60 * 60, // 30 days
          }
        )

        // Force a reload of all the current queries now that the user is
        // logged in
        client.resetStore().then(() => {
          redirect(null, '/')
        })
      } else {
        // our login failed, clear the cookie in case of expiry
        setMessage('Invalid credentials, please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong, please try again.')
    }
  }

  return (
    <form style={{ marginTop: '.6em' }} action="" onSubmit={handleSubmit}>
      <Stack space="small">
        {message}
        <Input
          type="text"
          name="Email"
          label="Email or Username"
          value={email}
          onChange={event => setEmail(event.currentTarget.value)}
        />
        <Input
          type="password"
          name="Password"
          label="Password"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <Row>
          <Button theme="PRIMARY" type="submit">
            Sign In
          </Button>
          {/* <Link href="/reset-password">
            <a>
              <Button>Forgot password?</Button>
            </a>
          </Link> */}
        </Row>
      </Stack>
    </form>
  )
}
