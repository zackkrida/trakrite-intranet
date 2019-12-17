import { Input } from './Input'
import { Button } from './Button'
import { useState, FormEventHandler } from 'react'

export const PasswordResetBox = () => {
  const [email, setEmail] = useState('')
  const [confirmedEmail, setConfirmedEmail] = useState('')

  const isDisabled = email !== confirmedEmail || email.length === 0

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault()
    alert('Damn!')
  }

  return (
    <form style={{ marginTop: '.6em' }} action="" onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={event => setEmail(event.currentTarget.value)}
        name="Email"
        label="Email"
      />
      <Input
        type="email"
        value={confirmedEmail}
        onChange={event => setConfirmedEmail(event.currentTarget.value)}
        name="Email"
        label="Confirm Email"
      />
      <Button disabled={isDisabled} theme="PRIMARY" type="submit">
        Send Reset Password Link
      </Button>
    </form>
  )
}
