import {
  UserInfoFragment,
  UserJobsFragment,
  UserMilesFragment,
  UserHoursFragment,
} from '@trakrite/queries'
import Link from 'next/link'
import { Card } from './Card'
import { OpenJobs } from './OpenJobs'
import { Stack } from './Stack'
import { UserJobs } from './UserJobs'
import { UserMiles } from './UserMiles'
import { UserInfoCard } from './UserInfoCard'
import { Button } from './Button'
import Dialog from '@reach/dialog'
import { JobForm } from './JobForm'
import { useState } from 'react'
import { JobList } from './JobList'
import { UserHours } from './UserHours'
import { AppUser } from '../../types'

export const UserView = ({ user }: { user: AppUser }) => {
  const [addingJob, setAddingJob] = useState(false)

  return (
    <div className="boxWrap">
      <Dialog isOpen={addingJob} onDismiss={() => setAddingJob(false)}>
        <Stack space="small">
          <h1>Add job</h1>
          <JobForm onComplete={() => setAddingJob(false)} />
        </Stack>
      </Dialog>
      <UserInfoCard user={user} />
      <Card>
        <Stack space="small">
          <h1>
            <Link href="/open-jobs">
              <a>Open Jobs</a>
            </Link>
          </h1>
          <OpenJobs user={user} limit={5} />
        </Stack>
      </Card>
      <Card
        topRight={
          <Button theme="PRIMARY" onClick={() => setAddingJob(true)}>
            Add Job
          </Button>
        }
      >
        <Stack space="small">
          <h1>
            <Link href="/my-jobs">
              <a>My Jobs</a>
            </Link>
          </h1>
          <UserJobs user={user} limit={5} />
        </Stack>
      </Card>

      <Card
        topRight={
          <Button theme="PRIMARY" onClick={() => setAddingJob(true)}>
            Add Job
          </Button>
        }
      >
        <Stack space="small">
          <h1>
            <Link href="/jobs">
              <a>All Jobs</a>
            </Link>
          </h1>
          <JobList limit={5} />
        </Stack>
      </Card>

      <Card>
        <Stack space="small">
          <h1>
            <Link href="/miles">
              <a>My Miles</a>
            </Link>
          </h1>
          <UserMiles user={user} limit={5} />
        </Stack>
      </Card>
      <Card>
        <Stack space="small">
          <h1>
            <Link href="/hours">
              <a>My Hours</a>
            </Link>
          </h1>
          <UserHours user={user} limit={5} />
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
