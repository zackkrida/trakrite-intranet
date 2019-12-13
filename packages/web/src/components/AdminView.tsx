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

export const AdminView = ({
  user,
}: {
  user: UserInfoFragment & UserMilesFragment & UserJobsFragment
}) => {
  const [addingUser, setAddingUser] = useState(false)
  const [addingJob, setAddingJob] = useState(false)

  return (
    <div className="boxWrap">
      <UserInfoCard user={user} />
      <Card>
        <Stack space="small">
          <h2>Manage Users</h2>
          <UserList limit={5} />
          <Button onClick={() => setAddingUser(true)}>Add User</Button>
          <Dialog isOpen={addingUser} onDismiss={() => setAddingUser(false)}>
            <Stack space="small">
              <h1>Add user</h1>
              <UserForm onComplete={() => setAddingUser(false)} />
            </Stack>
          </Dialog>
        </Stack>
      </Card>

      <Card>
        <Stack space="small">
          <h2>Manage Jobs</h2>
          <JobList />
          <Button onClick={() => setAddingJob(true)}>Add Job</Button>
          <Dialog isOpen={addingJob} onDismiss={() => setAddingJob(false)}>
            <Stack space="small">
              <h1>Add job</h1>
              <JobForm onComplete={() => setAddingJob(false)} />
            </Stack>
          </Dialog>
        </Stack>
      </Card>
      <style jsx>{`
        .boxWrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, 1fr);
          grid-gap: 1em;
        }

        @media screen and (min-width: 450px) {
          .boxWrap {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
            grid-gap: 1em;
          }
        }
      `}</style>
    </div>
  )
}
