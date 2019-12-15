import Dialog from '@reach/dialog'
import {
  MileInfoFragment,
  useDeleteMileMutation,
  UserInfoFragment,
  UserMilesFragment,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'toasted-notes'
import { Item } from './Item'
import { MileForm } from './MileForm'
import { TinyButton } from './TinyButton'

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
  const [editingMiles, setEditingMiles] = useState<null | MileInfoFragment>(
    null
  )
  const [deleteMile] = useDeleteMileMutation()

  const handleDelete = async (id: number) => {
    try {
      const { data, errors } = await deleteMile({
        variables: { id },
        refetchQueries: ['CurrentUser', 'User'],
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
    <div>
      {miles.length > 0 ? (
        <>
          {miles.slice(0, limit).map(mile => (
            <Item
              key={mile.id}
              title={mile.info}
              subtitle={<>{mile.distance}mi</>}
              right={date(mile.date)}
              actions={
                <>
                  <TinyButton onClick={() => setEditingMiles(mile)}>
                    Edit
                  </TinyButton>
                  <TinyButton onClick={() => handleDelete(mile.id)}>
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

      <Dialog
        isOpen={editingMiles != null}
        onDismiss={() => setEditingMiles(null)}
      >
        <MileForm
          userId={user.id}
          mile={editingMiles}
          onComplete={() => setEditingMiles(null)}
        />
      </Dialog>
    </div>
  )
}
