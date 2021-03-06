import {
  UserInfoFragment,
  UserJobsFragment,
  useOpenJobsQuery,
  JobInfoFragment,
  useClaimJobMutation,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'
import { useState, FormEventHandler } from 'react'
import Dialog from '@reach/dialog'
import { Stack } from './Stack'
import { TinyButton } from '../components/TinyButton'
import { Button } from './Button'
import { Row } from './Row'
import toaster from 'toasted-notes'
import { date } from '../lib/formatters'

export const OpenJobs = ({
  user,
  limit = undefined,
}: {
  user: UserInfoFragment & UserJobsFragment
  limit?: number
}) => {
  const { data, loading } = useOpenJobsQuery()
  const [claiming, setClaiming] = useState<null | JobInfoFragment>(null)
  const [claimJob] = useClaimJobMutation()
  const jobs = data?.jobs?.nodes ?? []

  const handleClaimJob: FormEventHandler = async event => {
    event.preventDefault()
    if (claiming == null) return

    try {
      const { errors } = await claimJob({
        variables: { id: claiming.id, userID: user.id },
        refetchQueries: ['CurrentUser', 'OpenJobs'],
      })

      if (!errors) {
        toaster.notify('Successfully claimed job')
      }
    } catch (error) {
      console.error(error)
      toaster.notify(`Error: ${error.message}.`)
    }
  }

  return (
    <>
      {!loading && jobs.length > 0 ? (
        <>
          <ul>
            {jobs.slice(0, limit).map(job => (
              <li
                key={job.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '4px .8em',
                  margin: '0 -.8em',
                  borderBottom: '1px solid #e3e3e3',
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospaced, monospace, sans-serif',
                    fontSize: '.8em',
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
                  <TinyButton onClick={() => setClaiming(job)}>
                    Claim Job
                  </TinyButton>
                </span>
              </li>
            ))}
          </ul>
          {limit > -1 && (
            <p style={{ lineHeight: 1 }}>
              <small>
                Showing up to {limit} most recently added jobs.{' '}
                <Link href="/open-jobs">
                  <a style={{ display: 'inline' }}>Click to view all.</a>
                </Link>
              </small>
            </p>
          )}

          <Dialog isOpen={claiming != null} onDismiss={() => setClaiming(null)}>
            {claiming && (
              <Stack space="small">
                <h1>Confirm claiming job</h1>
                <p>Please conform that you want to claim this job.</p>
                <p>
                  Please note: Once a job is claimed, if you want to remove it,
                  it will have to be removed by an administrator account.
                </p>
                <div>
                  <p>
                    <strong>Job: </strong>
                    {claiming.name}
                  </p>
                  <p>
                    <strong>Client: </strong>
                    {claiming.customerName}
                  </p>
                  {claiming.notes && (
                    <p>
                      <strong>Notes: </strong>
                      {claiming.notes}
                    </p>
                  )}
                </div>
                <form action="" onSubmit={handleClaimJob}>
                  <Row>
                    <Button type="submit" theme="PRIMARY">
                      Claim Job
                    </Button>
                    <Button onClick={() => setClaiming(null)}>Cancel</Button>
                  </Row>
                </form>
              </Stack>
            )}
          </Dialog>
        </>
      ) : (
        <>
          <p>No open jobs.</p>
        </>
      )}
    </>
  )
}
