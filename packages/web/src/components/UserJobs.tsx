import Dialog from '@reach/dialog'
import {
  JobInfoFragment,
  UserInfoFragment,
  UserJobsFragment,
  useUnassignJobsMutation,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { useState } from 'react'
import { JobForm } from '../components/JobForm'
import { Stack } from './Stack'
import { TinyButton } from './TinyButton'
import { Item } from './Item'
import toaster from 'toasted-notes'
import { Row } from './Row'
import { Button } from './Button'
import { useApolloClient } from '@apollo/react-hooks'

const date = (str: string) => {
  const date = new Date(str)

  if (date instanceof Date) {
    return format(date, 'MM/dd/yy')
  } else {
    throw Error('Invalid date')
  }
}

export const UserJobs = ({
  user,
  limit = undefined,
  showUnassign = false,
}: {
  user: UserInfoFragment & UserJobsFragment
  limit?: number
  showUnassign?: boolean
}) => {
  const jobs = user.jobs.nodes
  const [editing, setEditing] = useState<null | JobInfoFragment>(null)
  const [removing, setRemoving] = useState<null | JobInfoFragment>(null)
  const [unassignJobs] = useUnassignJobsMutation()
  const client = useApolloClient()

  return (
    <>
      <Dialog isOpen={editing != null} onDismiss={() => setEditing(null)}>
        {editing && (
          <>
            <Stack space="small">
              <h1>Editing job</h1>
              <JobForm job={editing} onComplete={() => setEditing(null)} />
            </Stack>
          </>
        )}
      </Dialog>

      <Dialog isOpen={removing != null} onDismiss={() => setRemoving(null)}>
        {removing && (
          <Stack space="small">
            <h1>Confirm removing job</h1>
            <form
              action=""
              onSubmit={async event => {
                event.preventDefault()
                try {
                  const { errors } = await unassignJobs({
                    variables: { jobs: [removing.id] },
                  })

                  if (!errors) {
                    client.reFetchObservableQueries()
                    toaster.notify('Removed job successfully')
                    setRemoving(null)
                  }
                } catch (error) {
                  console.error(error.message)
                }
              }}
            >
              <Stack space="small">
                <p>Confirm removal of job {removing.name}.</p>
                <Row>
                  <Button theme="PRIMARY" type="submit">
                    Remove user
                  </Button>
                  <Button onClick={() => setRemoving(null)}>Cancel</Button>
                </Row>
              </Stack>
            </form>
          </Stack>
        )}
      </Dialog>

      {jobs.length > 0 ? (
        <div>
          {jobs.slice(0, limit).map(job => (
            <Item
              key={job.id}
              title={
                <Link href={`/job/${job.id}`}>
                  <a>{job.name}</a>
                </Link>
              }
              subtitle={job.customerName}
              right={date(job.recievedOn)}
              actions={
                <>
                  <TinyButton onClick={() => setEditing(job)}>Edit</TinyButton>
                  {showUnassign && (
                    <TinyButton onClick={() => setRemoving(job)}>
                      Unassign
                    </TinyButton>
                  )}
                </>
              }
            />
          ))}
          {limit > 0 && (
            <p style={{ lineHeight: 1 }}>
              <small>
                Showing up to {limit} most recently added jobs.{' '}
                <Link href="/jobs">
                  <a style={{ display: 'inline' }}>Click to view all.</a>
                </Link>
              </small>
            </p>
          )}
        </div>
      ) : (
        <>
          <p>No jobs logged yet.</p>
        </>
      )}
    </>
  )
}
