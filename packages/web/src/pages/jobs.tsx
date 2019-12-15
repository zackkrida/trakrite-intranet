import { Page } from '../components/Page'
import { UserJobs } from '../components/UserJobs'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'
import { JobList } from '../components/JobList'
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
              currentUser.isAdmin && (
                <Button theme="PRIMARY" onClick={() => setAddingJob(true)}>
                  Add Job
                </Button>
              )
            }
          >
            <Stack space="small">
              <h1>All {currentUser.isAdmin ? 'Jobs' : 'My Jobs'}</h1>
              {currentUser.isAdmin ? (
                <>
                  <JobList />

                  <Dialog
                    isOpen={addingJob}
                    onDismiss={() => setAddingJob(false)}
                  >
                    <Stack space="small">
                      <h1>Add user</h1>
                      <JobForm onComplete={() => setAddingJob(false)} />
                    </Stack>
                  </Dialog>
                </>
              ) : (
                <UserJobs user={currentUser} />
              )}
            </Stack>
          </Card>
        ) : null
      }
    </Page>
  )
}

export default withApollo(Jobs)
