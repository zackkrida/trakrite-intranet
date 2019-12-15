import {
  UserInfoFragment,
  MileInfoFragment,
  useAddMileMutation,
  useEditMileMutation,
} from '@trakrite/queries'
import { useState } from 'react'
import { format, formatISO } from 'date-fns'
import { Stack } from './Stack'
import { Input } from './Input'
import { Button } from './Button'
import toast from 'toasted-notes'
import { Row } from './Row'

export const MileForm = ({
  userId,
  mile,
  onComplete,
}: {
  userId: UserInfoFragment['id']
  mile?: MileInfoFragment
  onComplete: () => void
}) => {
  const [addMile] = useAddMileMutation()
  const [editMile] = useEditMileMutation()

  // Form fields
  const [distance, setDistance] = useState(mile ? mile.distance : 0)
  const [info, setInfo] = useState(mile ? mile.info : '')
  const [date, setDate] = useState(
    format(mile ? new Date(mile.date) : new Date(), 'yyyy-MM-dd')
  )

  const handleCreate = async () => {
    event.preventDefault()
    try {
      const {
        data: {
          createMile: { mile },
        },
        errors,
      } = await addMile({
        variables: {
          mile: {
            userId,
            distance,
            info,
            date: formatISO(new Date(date)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser', 'User'],
      })

      if (mile && !errors) {
        toast.notify('Miles added.')
        setDistance(0)
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
        data: { updateMile },
        errors,
      } = await editMile({
        variables: {
          id: mile.id,
          patch: {
            userId,
            distance,
            info,
            date: formatISO(new Date(date)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser'],
      })

      if (updateMile.mile && !errors) {
        toast.notify('Miles edited.')
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
        mile ? handleEdit() : handleCreate()
      }}
    >
      <Stack space="small">
        <h1>{mile ? 'Edit' : 'Add'} miles</h1>

        <Input
          label="Distance (Round to the nearest mile)"
          type="number"
          value={distance}
          onChange={event => setDistance(parseInt(event.currentTarget.value))}
        />
        <Input
          type="text"
          label="Description/Purpose of Trip"
          placeholder="Refueled company vans, met with client x, etc."
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
            {mile ? 'Update' : 'Add'} miles
          </Button>
          <Button onClick={() => onComplete()}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
