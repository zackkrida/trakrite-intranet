import { useState, FormEventHandler } from 'react'
import {
  UserInfoFragment,
  UserMilesFragment,
  useAddMileMutation,
  useDeleteMileMutation,
} from '@trakrite/queries'
import { CreationOptions } from '../../types'
import { Button } from './Button'
import Dialog from '@reach/dialog'
import { Input } from './Input'
import { Stack } from './Stack'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import Link from 'next/link'

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
  limit = -1,
}: {
  user: UserInfoFragment & UserMilesFragment
  limit?: number
}) => {
  const miles = user.miles.nodes
  const [addingMiles, setAddingMiles] = useState<CreationOptions>('INACTIVE')
  const [deleteMile] = useDeleteMileMutation()

  const handleDelete = async (id: number) => {
    try {
      const { data, errors } = await deleteMile({
        variables: { id },
        refetchQueries: ['CurrentUser'],
      })

      if (!errors) {
        console.log(data)
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
                  alignItems: 'center',
                  padding: '4px 12px',
                  margin: '0 -16px',
                  borderBottom: '1px solid #e3e3e3',
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospaced, monospace, sans-serif',
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
                  <button
                    className="delete"
                    onClick={() => handleDelete(mile.id)}
                  >
                    <span>+</span>
                    <style jsx>{`
                      .delete {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 1px solid #fff;
                        margin-left: 6px;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 4px;
                        line-height: 1;
                        display: inline-block;
                        border-radius: 4px;
                      }

                      .delete > span {
                        display: block;
                        transform: rotate(45deg);
                        transform-origin: center;
                      }

                      .delete:hover,
                      .delete:focus {
                        border: 1px solid #e3e3e3;
                        outline: 0;
                      }
                    `}</style>
                  </button>
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
        <AddMileForm userId={user.id} />
      </Dialog>
    </>
  )
}

const AddMileForm = ({ userId }: UserInfoFragment['id']) => {
  const [addMile] = useAddMileMutation()
  const [distance, setDistance] = useState(0)
  const [info, setInfo] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const handleSubmit: FormEventHandler = async event => {
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
        alert('success!')
        setDistance(0)
        setInfo('')
        setDate(format(new Date(), 'yyyy-MM-dd'))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack space="small">
        <h1>Add miles</h1>

        <Input
          label="Distance (Round to the nearest mile)"
          type="number"
          value={distance}
          onChange={event => setDistance(parseInt(event.currentTarget.value))}
        />
        <Input
          type="text"
          label="Description/Purpose of Trip"
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
          Add miles
        </Button>
      </Stack>
    </form>
  )
}
