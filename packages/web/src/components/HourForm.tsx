import {
  UserInfoFragment,
  HourInfoFragment,
  useAddHourMutation,
  useEditHourMutation,
} from '@trakrite/queries'
import { useState } from 'react'
import { format, formatISO } from 'date-fns'
import { Stack } from './Stack'
import { Input } from './Input'
import { Button } from './Button'
import toast from 'toasted-notes'
import { Row } from './Row'

export const HourForm = ({
  userId,
  hour,
  onComplete,
}: {
  userId: UserInfoFragment['id']
  hour?: HourInfoFragment
  onComplete: () => void
}) => {
  const [addHour] = useAddHourMutation()
  const [editHour] = useEditHourMutation()

  // Form fields
  const [duration, setDuration] = useState(hour ? hour.duration : 0)
  const [info, setInfo] = useState(hour ? hour.info : '')
  const [date, setDate] = useState(
    format(hour ? new Date(hour.date) : new Date(), 'yyyy-MM-dd')
  )

  const handleCreate = async () => {
    event.preventDefault()
    try {
      const {
        data: {
          createHour: { hour },
        },
        errors,
      } = await addHour({
        variables: {
          hour: {
            userId,
            duration,
            info,
            date: formatISO(new Date(date)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser', 'User'],
      })

      if (hour && !errors) {
        toast.notify('Hours added.')
        setDuration(0)
        setInfo('')
        setDate(format(new Date(), 'yyyy-MM-dd'))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleEdit = async () => {
    event.preventDefault()
    try {
      const {
        data: { updateHour },
        errors,
      } = await editHour({
        variables: {
          id: hour.id,
          patch: {
            userId,
            duration,
            info,
            date: formatISO(new Date(date)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser'],
      })

      if (updateHour.hour && !errors) {
        toast.notify('Hours edited.')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form
      action=""
      onSubmit={event => {
        event.preventDefault()
        hour ? handleEdit() : handleCreate()
      }}
    >
      <Stack space="small">
        <h1>{hour ? 'Edit' : 'Add'} hours</h1>

        <Input
          label="Duration (In minutes)"
          type="number"
          value={duration}
          onChange={event => setDuration(parseInt(event.currentTarget.value))}
        />
        <Input
          type="text"
          label="Description of time"
          placeholder="On-site meeting, computer work, etc."
          name="info"
          value={info}
          onChange={event => setInfo(event.currentTarget.value)}
        />
        <Input
          label="Date"
          name="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          type="date"
        />

        <Row>
          <Button disabled={info === ''} type="submit" theme="PRIMARY">
            {hour ? 'Update' : 'Add'} hours
          </Button>
          <Button onClick={() => onComplete()}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
