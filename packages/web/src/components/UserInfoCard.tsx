import {
  UserInfoFragment,
  useUpdateCurrentUserPasswordMutation,
} from '@trakrite/queries'
import { useState, FormEventHandler } from 'react'
import toaster from 'toasted-notes'
import { Card } from './Card'
import { Stack } from './Stack'
import { Button } from './Button'
import Dialog from '@reach/dialog'
import { Input } from './Input'
import { Row } from './Row'

export const UserInfoCard = ({ user }: { user: UserInfoFragment }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [updatePassword] = useUpdateCurrentUserPasswordMutation()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passValid = newPassword !== '' && newPassword === confirmPassword

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault()
    try {
      const { data, errors } = await updatePassword({
        variables: { password: newPassword },
      })
      if (!errors && data.updateCurrentPassword.success) {
        setEditing(false)
        toaster.notify('Password updated.')
      } else {
        throw Error('Save failed.')
      }
    } catch (error) {
      console.error(error)
      toaster.notify('Password not updated due to error \n.' + error.message)
    }
  }

  return (
    <Card>
      <Stack space="small">
        <h1>Trakrite Intranet</h1>
        <div>
          <p>Welcome {user.fullName}!</p>
          {user.isAdmin && (
            <p>
              <strong>Logged in as an administrator.</strong>
            </p>
          )}
        </div>
        <Button onClick={() => setEditing(true)}>Edit Account Info</Button>
        <Dialog isOpen={editing} onDismiss={() => setEditing(false)}>
          <Stack space="small">
            <h1>Update password</h1>
            <form action="" onSubmit={handleSubmit}>
              <Stack space="small">
                <Input
                  label="Password"
                  type="password"
                  value={newPassword}
                  onChange={event => setNewPassword(event.currentTarget.value)}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={event =>
                    setConfirmPassword(event.currentTarget.value)
                  }
                />
                {!passValid &&
                  newPassword.length > 0 &&
                  confirmPassword.length > 0 && <p>Passwords do not match.</p>}
                <Row>
                  <Button disabled={!passValid} theme="PRIMARY" type="submit">
                    Update Password
                  </Button>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                </Row>
              </Stack>
            </form>
          </Stack>
        </Dialog>
      </Stack>
    </Card>
  )
}
