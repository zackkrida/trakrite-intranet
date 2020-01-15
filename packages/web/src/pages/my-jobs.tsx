import { Page } from '../components/Page'
import { UserJobs } from '../components/UserJobs'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'
import { Button } from '../components/Button'
import { useState } from 'react'
import Dialog from '@reach/dialog'
import { JobForm } from '../components/JobForm'

const Jobs = () => {
  const [addingJob, setAddingJob] = useState(false)

  return (
    <Page>
      {({ currentUser }) =>
        currentUser ? (
          <Card
            topRight={
              <Button theme="PRIMARY" onClick={() => setAddingJob(true)}>
                Add Job
              </Button>
            }
          >
            <Stack space="small">
              <h1>My Jobs</h1>

              <Dialog isOpen={addingJob} onDismiss={() => setAddingJob(false)}>
                <Stack space="small">
                  <h1>Add user</h1>
                  <JobForm onComplete={() => setAddingJob(false)} />
                </Stack>
              </Dialog>
              <UserJobs user={currentUser} />
            </Stack>
          </Card>
        ) : null
      }
    </Page>
  )
}

export default withApollo(Jobs)
