import Dialog from '@reach/dialog'
import {
  HourInfoFragment,
  useDeleteHourMutation,
  UserInfoFragment,
  UserHoursFragment,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'toasted-notes'
import { Item } from './Item'
import { HourForm } from './HourForm'
import { TinyButton } from './TinyButton'
import { AppUser } from '../../types'

const date = (str: string) => {
  const date = new Date(str)

  if (date instanceof Date) {
    return format(date, 'MM/dd/yy')
  } else {
    throw Error('Invalid date')
  }
}

const formatRelativeTimeLog = (minutes: number) =>
  minutes < 60 ? `${minutes}min` : `${minutes / 60}hr`

export const UserHours = ({
  user,
  limit = undefined,
}: {
  user: AppUser
  limit?: number
}) => {
  const hours = user.hours.nodes
  const [editingHours, setEditingHours] = useState<null | HourInfoFragment>(
    null
  )
  const [deleteHour] = useDeleteHourMutation()

  const handleDelete = async (id: number) => {
    try {
      const { data, errors } = await deleteHour({
        variables: { id },
        refetchQueries: ['CurrentUser', 'User'],
      })

      if (!errors) {
        console.log(data)
        toast.notify('Hours deleted.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {hours.length > 0 ? (
        <>
          {hours.slice(0, limit).map(hour => (
            <Item
              key={hour.id}
              title={hour.info}
              subtitle={formatRelativeTimeLog(hour.duration)}
              right={date(hour.date)}
              actions={
                <>
                  <TinyButton onClick={() => setEditingHours(hour)}>
                    Edit
                  </TinyButton>
                  <TinyButton onClick={() => handleDelete(hour.id)}>
                    Delete
                  </TinyButton>
                </>
              }
            />
          ))}
          {limit > -1 && (
            <p style={{ lineHeight: 1 }}>
              <small>
                Showing up to {limit} most recently added trips.{' '}
                <Link href="/hours">
                  <a style={{ display: 'inline' }}>Click to view all.</a>
                </Link>
              </small>
            </p>
          )}
        </>
      ) : (
        <>
          <p>No hours logged yet.</p>
        </>
      )}

      <Dialog
        isOpen={editingHours != null}
        onDismiss={() => setEditingHours(null)}
      >
        <HourForm
          userId={user.id}
          hour={editingHours}
          onComplete={() => setEditingHours(null)}
        />
      </Dialog>
    </div>
  )
}
