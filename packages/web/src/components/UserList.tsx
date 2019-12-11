import { useUsersQuery } from '@trakrite/queries'

export const UserList = () => {
  const { data, loading } = useUsersQuery()
  const users = data?.users?.nodes ?? []

  return (
    <>
      {loading && 'Loading users...'}
      {!loading && users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.fullName} Type:{' '}
              {user.isAdmin ? <strong>Admin</strong> : <strong>User</strong>}
            </li>
          ))}
        </ul>
      )}
      {!loading && users.length === 0 && <p>There are no users.</p>}
    </>
  )
}
