import {
  UserInfoFragment,
  UserJobsFragment,
  UserMilesFragment,
} from '@trakrite/queries'
import { Button } from './Button'
import { Card } from './Card'
import { Stack } from './Stack'
import { UserInfoCard } from './UserInfoCard'
import { UserList } from './UserList'
import { JobList } from './JobList'
import { useState } from 'react'
import Dialog from '@reach/dialog'
import { JobForm } from './JobForm'
import { UserForm } from './UserForm'
import { CardSet } from './CardSet'
import Link from 'next/link'

export const AdminView = ({
  user,
}: {
  user: UserInfoFragment & UserMilesFragment & UserJobsFragment
}) => {
  const [addingUser, setAddingUser] = useState(false)
  const [addingJob, setAddingJob] = useState(false)

  return (
    <CardSet>
      <UserInfoCard user={user} />
      {/* <Card>
        <Stack space="small">
          <h3>About this application</h3>
          <p>
            This is the trakrite intranet. Use this application to manage
            employees, jobs, and employee mileage.
          </p>
          <p>
            You may add/edit users and jobs. Click on a job/user name to view
            all info.
          </p>
        </Stack>
      </Card> */}
      <Card
        topRight={
          <Button theme="PRIMARY" onClick={() => setAddingJob(true)}>
            Add Job
          </Button>
        }
      >
        <Stack space="small">
          <h2>
            <Link href="/jobs">
              <a>Manage Jobs</a>
            </Link>
          </h2>
          <JobList limit={5} />
          <Dialog isOpen={addingJob} onDismiss={() => setAddingJob(false)}>
            <Stack space="small">
              <h1>Add job</h1>
              <JobForm onComplete={() => setAddingJob(false)} />
            </Stack>
          </Dialog>
        </Stack>
      </Card>

      <Card
        topRight={
          <Button theme="PRIMARY" onClick={() => setAddingUser(true)}>
            Add User
          </Button>
        }
      >
        <Stack space="small">
          <h2>
            <Link href="/users">
              <a>Manage Users</a>
            </Link>
          </h2>
          <UserList limit={5} />
          <Dialog isOpen={addingUser} onDismiss={() => setAddingUser(false)}>
            <Stack space="small">
              <h1>Add user</h1>
              <UserForm onComplete={() => setAddingUser(false)} />
            </Stack>
          </Dialog>
        </Stack>
      </Card>
    </CardSet>
  )
}
