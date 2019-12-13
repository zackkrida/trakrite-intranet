import Dialog from '@reach/dialog'
import {
  JobInfoFragment,
  UserInfoFragment,
  UserJobsFragment,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { useState } from 'react'
import { JobForm } from '../components/JobForm'
import { Stack } from './Stack'
import { TinyButton } from './TinyButton'

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
