import { useRouter } from 'next/router'
import { useUserQuery } from '@trakrite/queries'
import { withApollo } from '../../lib/apollo'
import { NextPage } from 'next'
import { Page } from '../../components/Page'
import { Card } from '../../components/Card'
import { UserMiles } from '../../components/UserMiles'
import { UserHours } from '../../components/UserHours'
import { CardSet } from '../../components/CardSet'
import { Stack } from '../../components/Stack'
import { UserJobs } from '../../components/UserJobs'
import { CreationOptions } from '../../../types'
import { useState } from 'react'
import { Button } from '../../components/Button'
import Dialog from '@reach/dialog'
import { MileForm } from '../../components/MileForm'
import { HourForm } from '../../components/HourForm'
import { AssignJobForm } from '../../components/AssignJobForm'

const User: NextPage<{}> = () => {
  const { query } = useRouter()
  const { data } = useUserQuery({ variables: { id: query.id } })
  const [addingMiles, setAddingMiles] = useState<CreationOptions>('INACTIVE')
  const [addingHours, setAddingHours] = useState<CreationOptions>('INACTIVE')

  const [assigningJob, setAssigningJob] = useState<CreationOptions>('INACTIVE')

  const user = data?.user

  if (!user) return null

  return (
    <Page>
      <CardSet>
        <Card>
          <Stack space="small">
            <header>
              <h1>{user.fullName}</h1>
              <p>{user.jobTitle}</p>
            </header>
            <hr />
            <p>
              <strong>Type:</strong>{' '}
              {user.isAdmin ? 'Administrator' : 'Employee'}
            </p>
          </Stack>
        </Card>

        <Card
          topRight={
            <Button theme="PRIMARY" onClick={() => setAssigningJob('ACTIVE')}>
              Assign Job
            </Button>
          }
        >
          <Stack space="small">
            <h1>Jobs</h1>
            <UserJobs user={user} showUnassign={true} />
            <Dialog
              isOpen={assigningJob === 'ACTIVE'}
              onDismiss={() => setAssigningJob('INACTIVE')}
            >
              <AssignJobForm
                user={user}
                onComplete={() => setAssigningJob('INACTIVE')}
              />
            </Dialog>
          </Stack>
        </Card>

        <Card
          topRight={
            <Button theme="PRIMARY" onClick={() => setAddingMiles('ACTIVE')}>
              Add Miles
            </Button>
          }
        >
          <Stack space="small">
            <h1>Miles</h1>
            <UserMiles user={user} />

            <Dialog
              isOpen={addingMiles === 'ACTIVE'}
              onDismiss={() => setAddingMiles('INACTIVE')}
            >
              <MileForm
                userId={user.id}
                onComplete={() => setAddingMiles('INACTIVE')}
              />
            </Dialog>
          </Stack>
        </Card>

        <Card
          topRight={
            <Button theme="PRIMARY" onClick={() => setAddingHours('ACTIVE')}>
              Add Hours
            </Button>
          }
        >
          <Stack space="small">
            <h1>Hours</h1>
            <UserHours user={user} />

            <Dialog
              isOpen={addingHours === 'ACTIVE'}
              onDismiss={() => setAddingHours('INACTIVE')}
            >
              <HourForm
                userId={user.id}
                onComplete={() => setAddingHours('INACTIVE')}
              />
            </Dialog>
          </Stack>
        </Card>
      </CardSet>
    </Page>
  )
}

export default withApollo(User)
