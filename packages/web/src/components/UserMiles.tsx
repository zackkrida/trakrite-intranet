import { useState } from 'react'
import {
  UserInfoFragment,
  UserMilesFragment,
  useAddMileMutation,
  useDeleteMileMutation,
  useEditMileMutation,
  MileInfoFragment,
} from '@trakrite/queries'
import { CreationOptions } from '../../types'
import { Button } from './Button'
import Dialog from '@reach/dialog'
import { Input } from './Input'
import { Stack } from './Stack'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import Link from 'next/link'
import { TinyButton } from './TinyButton'
import toast from 'toasted-notes'

const date = (str: string) => {
  const date = new Date(str)

  if (date instanceof Date) {
    return format(date, 'MM/dd/yy')
  } else {
    throw Error('Invalid date')
  }
}

export const UserMiles = ({
  user,
  limit = undefined,
}: {
  user: UserInfoFragment & UserMilesFragment
  limit?: number
}) => {
  const miles = user.miles.nodes
  const [addingMiles, setAddingMiles] = useState<CreationOptions>('INACTIVE')
  const [editingMiles, setEditingMiles] = useState<null | MileInfoFragment>(
    null
  )
  const [deleteMile] = useDeleteMileMutation()

  const handleDelete = async (id: number) => {
    try {
      const { data, errors } = await deleteMile({
        variables: { id },
        refetchQueries: ['CurrentUser'],
      })

      if (!errors) {
        console.log(data)
        toast.notify('Miles deleted.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {miles.length > 0 ? (
        <>
          <ul>
            {miles.slice(0, limit).map(mile => (
              <li
                key={mile.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '4px 12px',
                  margin: '0 -12px',
                  borderBottom: '1px solid #e3e3e3',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '-.25px',
                    marginRight: '1em',
                  }}
                >
                  {date(mile.date)}
                </span>{' '}
                {mile.info}{' '}
                <span style={{ marginLeft: 'auto' }}>
                  {mile.distance}mi
                  <TinyButton onClick={() => setEditingMiles(mile)}>
                    Edit
                  </TinyButton>
                  <TinyButton onClick={() => handleDelete(mile.id)}>
                    Delete
                  </TinyButton>
                </span>
              </li>
            ))}
          </ul>
          {limit > -1 && (
            <p style={{ lineHeight: 1 }}>
              <small>
                Showing up to {limit} most recently added trips.{' '}
                <Link href="/miles">
                  <a style={{ display: 'inline' }}>Click to view all.</a>
                </Link>
              </small>
            </p>
          )}
        </>
      ) : (
        <>
          <p>No miles logged yet.</p>
        </>
      )}
      <Button onClick={() => setAddingMiles('ACTIVE')}>Add Miles</Button>
      <Dialog
        isOpen={addingMiles === 'ACTIVE'}
        onDismiss={() => setAddingMiles('INACTIVE')}
      >
        <MileForm userId={user.id} />
      </Dialog>

      <Dialog
        isOpen={editingMiles != null}
        onDismiss={() => setEditingMiles(null)}
      >
        <MileForm userId={user.id} mile={editingMiles} />
      </Dialog>
    </>
  )
}

const MileForm = ({
  userId,
  mile,
}: {
  userId: UserInfoFragment['id']
  mile?: MileInfoFragment
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
        refetchQueries: ['CurrentUser'],
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
        <Button type="submit" theme="PRIMARY">
          {mile ? 'Update' : 'Add'} miles
        </Button>
      </Stack>
    </form>
  )
}
