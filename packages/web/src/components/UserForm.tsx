import { useRegisterUserMutation, UserInfoFragment } from '@trakrite/queries'
import { FormEventHandler, useState } from 'react'
import toaster from 'toasted-notes'
import { Button } from './Button'
import { Input } from './Input'
import { Row } from './Row'
import { Stack } from './Stack'

export const UserForm = ({
  user,
  onComplete,
}: {
  user?: UserInfoFragment
  onComplete: () => void
}) => {
  // Form fields
  const [firstName, setFirstName] = useState<UserInfoFragment['firstName']>('')
  const [lastName, setLastName] = useState<UserInfoFragment['lastName']>('')
  const [jobTitle, setJobTitle] = useState<UserInfoFragment['jobTitle']>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // User mutation
  const [addUser] = useRegisterUserMutation()

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault()

    try {
      const { errors } = await addUser({
        variables: {
          user: {
            firstName,
            lastName,
            email,
            jobTitle,
            password,
          },
        },
        refetchQueries: ['Users'],
      })

      if (!errors) {
        onComplete()
        toaster.notify('User created.')
      }
    } catch (error) {
      console.error(error)
      toaster.notify(`Error: ${error.message}`)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack space="small">
        <Input
          label="First Name"
          value={firstName}
          onChange={event => setFirstName(event.currentTarget.value)}
        />
        <Input
          label="Last Name"
          value={lastName}
          onChange={event => setLastName(event.currentTarget.value)}
        />
        <Input
          label="Job Title"
          value={jobTitle}
          onChange={event => setJobTitle(event.currentTarget.value)}
        />
        <Input
          label="Email or Username"
          value={email}
          onChange={event => setEmail(event.currentTarget.value)}
        />
        <Input
          label="Password"
          type="text"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <p>
          Please instruct users to change their password after their first
          login.
        </p>

        <Row>
          <Button type="submit" theme="PRIMARY">
            Create User
          </Button>
          <Button onClick={onComplete}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
