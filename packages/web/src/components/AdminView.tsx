import {
  UserInfoFragment,
  UserMilesFragment,
  UserJobsFragment,
} from '@trakrite/queries'
import { Card } from './Card'
import { Stack } from './Stack'
import { Button } from './Button'
import Link from 'next/link'
import { OpenJobs } from './OpenJobs'
import { UserJobs } from './UserJobs'
import { UserMiles } from './UserMiles'
import { Row } from './Row'
import { UserList } from './UserList'

export const AdminView = ({
  user,
}: {
  user: UserInfoFragment & UserMilesFragment & UserJobsFragment
}) => (
  <Row expandItems={true}>
    <Card>
      <h1>Trakrite Intranet</h1>
      <p>Welcome {user.fullName}</p>
    </Card>

    <Card>
      <h2>Manage Users</h2>
      <UserList />
    </Card>
  </Row>
)
