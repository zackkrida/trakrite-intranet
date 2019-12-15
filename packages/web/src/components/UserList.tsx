import Link from 'next/link'
import { useUsersQuery } from '@trakrite/queries'
import { Item } from './Item'

export const UserList = ({
  limit = undefined,
}: {
  limit?: number | undefined
}) => {
  const { data, loading } = useUsersQuery()
  const users = data?.users?.nodes ?? []

  return (
    <div>
      {loading && 'Loading users...'}
      {!loading &&
        users.length > 0 &&
        users.slice(0, limit).map(user => (
          <Item
            key={user.id}
            title={
              <Link href={`/user/${user.id}`}>
                <a>{user.fullName} </a>
              </Link>
            }
            subtitle={user.jobTitle}
            right={
              <>
                <p>Assigned {user?.jobs?.nodes.length ?? 0} Jobs</p>
                <p>
                  {user?.miles?.nodes.length ?? 0} Trips (
                  {user?.miles?.nodes.reduce(
                    (acc, mile) => acc + mile.distance,
                    0
                  ) ?? 0}
                  mi) Logged
                </p>
              </>
            }
          />
        ))}
      {!loading && users.length > 0 && limit > 0 && (
        <p>
          <small>
            Showing up to {limit} users.{' '}
            <Link href="/users">
              <a style={{ display: 'inline' }}>Click to view all.</a>
            </Link>
          </small>
        </p>
      )}
      {!loading && users.length === 0 && <p>There are no users.</p>}
    </div>
  )
}
