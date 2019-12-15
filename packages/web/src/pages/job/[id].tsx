import { useRouter } from 'next/router'
import { CardSet } from '../../components/CardSet'
import { Card } from '../../components/Card'
import { useJobQuery, JobInfoFragment } from '@trakrite/queries'
import { withApollo } from '../../lib/apollo'
import { Page } from '../../components/Page'
import { Stack } from '../../components/Stack'
import { date } from '../../lib/formatters'
import { useState } from 'react'
import { Button } from '../../components/Button'
import Dialog from '@reach/dialog'
import { JobForm } from '../../components/JobForm'

const Job = () => {
  const { query } = useRouter()
  const [editing, setEditing] = useState<null | JobInfoFragment>(null)
  const { data } = useJobQuery({ variables: { id: query.id } })
  const job = data?.job

  if (!job) {
    return null
  }

  return (
    <Page>
      <CardSet>
        <Card
          topRight={
            <Button theme="PRIMARY" onClick={() => setEditing(job)}>
              Edit
            </Button>
          }
        >
          <Stack space="small">
            <Dialog isOpen={editing != null} onDismiss={() => setEditing(null)}>
              {editing && (
                <Stack space="small">
                  <h1>Editing job</h1>
                  <JobForm job={editing} onComplete={() => setEditing(null)} />
                </Stack>
              )}
            </Dialog>
            <h1>{job.name}</h1>
            <div>
              <p>
                <strong>For Customer:</strong> {job.customerName}
              </p>
              <p>
                <strong>Recieved On:</strong> {date(job.recievedOn)}
              </p>
            </div>
            <hr />
            <div>
              <p>
                <strong>Notes: </strong>
                {job.notes}
              </p>
              <p>
                <strong>Payment Status:</strong> {job.paymentStatus}
              </p>
              <p>
                <strong>
                  <strong>Progress:</strong>{' '}
                </strong>
                {job.progress}
              </p>
            </div>
          </Stack>
        </Card>
      </CardSet>
    </Page>
  )
}

export default withApollo(Job)
