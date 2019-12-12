import {
  UserInfoFragment,
  UserJobsFragment,
  JobInfoFragment,
  PayStatus,
  useEditJobMutation,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { TinyButton } from './TinyButton'
import { useState, FormEventHandler } from 'react'
import Dialog from '@reach/dialog'
import { Button } from './Button'
import { Row } from './Row'
import { Stack } from './Stack'
import { Input } from './Input'
import { id } from 'date-fns/locale'
import toaster from 'toasted-notes'

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
}: {
  user: UserInfoFragment & UserJobsFragment
  limit?: number
}) => {
  const jobs = user.jobs.nodes
  const [editing, setEditing] = useState<null | JobInfoFragment>(null)

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

      {jobs.length > 0 ? (
        <>
          <ul>
            {jobs.slice(0, limit).map(job => (
              <li
                key={job.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '4px 12px',
                  margin: '0 -12px',
                  borderBottom: '1px solid #e3e3e3',
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospaced, monospace, sans-serif',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '-.25px',
                    marginRight: '1em',
                  }}
                >
                  {date(job.recievedOn)}
                </span>
                <div>
                  <strong>{job.name} </strong> for {job.customerName}
                  {job.notes && (
                    <>
                      <br />
                      <p>{job.notes}</p>
                    </>
                  )}
                </div>
                <span style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                  <TinyButton onClick={() => setEditing(job)}>Edit</TinyButton>
                </span>
              </li>
            ))}
          </ul>
          {limit > -1 && (
            <p style={{ lineHeight: 1 }}>
              <small>
                Showing up to {limit} most recently added trips.{' '}
                <Link href="/jobs">
                  <a style={{ display: 'inline' }}>Click to view all.</a>
                </Link>
              </small>
            </p>
          )}
        </>
      ) : (
        <>
          <p>No jobs logged yet.</p>
        </>
      )}
    </>
  )
}

const JobForm = ({
  job,
  onComplete,
}: {
  job: JobInfoFragment
  onComplete: () => void
}) => {
  // Form fields
  const [notes, setNotes] = useState(job.notes)
  const [paymentStatus, setPaymentStatus] = useState<PayStatus>(
    job.paymentStatus
  )
  const [progress, setProgress] = useState(job.progress)

  // Job mutation
  const [editJob] = useEditJobMutation()

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault()

    try {
      let { errors } = await editJob({
        variables: {
          id: job.id,
          patch: {
            notes,
            paymentStatus,
            progress,
          },
        },
        refetchQueries: ['CurrentUser'],
      })

      if (!errors) {
        onComplete()
        toaster.notify('Job edited.')
      }
    } catch (error) {
      console.error(error)
      toaster.notify(`Error: ${error.message}`)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack space="small">
        <div>
          <strong>Name: </strong>
          {job.name}
          <br />
          <strong>Customer:</strong> {job.customerName}
        </div>

        <Input
          label="Notes"
          value={notes}
          onChange={event => setNotes(event.currentTarget.value)}
        />

        <label style={{ display: 'block' }} htmlFor="payStatus">
          <span style={{ display: 'block', marginBottom: '6px' }}>
            Payment Status
          </span>
          <select
            style={{ width: '100%', display: 'block', padding: '10px' }}
            name="payStatus"
            value={paymentStatus}
            onChange={event =>
              setPaymentStatus(event.currentTarget.value as PayStatus)
            }
          >
            <option value={PayStatus.Waiting} selected>
              {PayStatus.Waiting}
            </option>
            <option value={PayStatus.Pending}>{PayStatus.Pending}</option>
            <option value={PayStatus.Cancelled}>{PayStatus.Cancelled}</option>
            <option value={PayStatus.Invoiced}>{PayStatus.Invoiced}</option>
            <option value={PayStatus.Paid}>{PayStatus.Paid}</option>
          </select>
        </label>

        <Input
          label="Progress"
          value={progress}
          onChange={event => setProgress(event.currentTarget.value)}
        />

        <Row>
          <Button type="submit" theme="PRIMARY">
            Save Job
          </Button>
          <Button onClick={onComplete}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
