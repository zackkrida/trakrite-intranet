import {
  useJobsQuery,
  JobInfoFragment,
  useAssignJobsMutation,
  useUsersQuery,
  UserInfoFragment,
} from '@trakrite/queries'
import { Item } from './Item'
import { date } from '../lib/formatters'
import Link from 'next/link'
import { TinyButton } from './TinyButton'
import { useState } from 'react'
import Dialog from '@reach/dialog'
import { Stack } from './Stack'
import toaster from 'toasted-notes'
import { Row } from './Row'
import { Button } from './Button'

export const JobList = ({
  limit = undefined,
}: {
  limit?: number | undefined
}) => {
  const { data, loading } = useJobsQuery()
  const jobs = data?.jobs?.nodes ?? []

  const { data: usersData, loading: loadingUsers } = useUsersQuery()
  const users = usersData?.users?.nodes ?? []

  const [assignUser] = useAssignJobsMutation()
  const [assigningUser, setAssigningUser] = useState<false | JobInfoFragment>(
    false
  )
  const [chosenUser, setChosenUser] = useState<false | UserInfoFragment>(false)

  return (
    <div>
      {loading && 'Loading jobs...'}
      {!loading &&
        jobs.length > 0 &&
        jobs.slice(0, limit).map(job => (
          <Item
            key={job.id}
            title={
              <Link href={`/job/${job.id}`}>
                <a>
                  <span>{job.name}</span>
                </a>
              </Link>
            }
            subtitle={
              <>
                Customer: {job.customerName}
                <br /> <span>Address: {job.jobAddress}</span>
              </>
            }
            right={
              <>
                <span>Pay Status: {job.paymentStatus}</span>
                <br />
                Received: {date(job.recievedOn)}
                <div style={{ display: 'block', marginTop: '6px' }}>
                  {!job.userId ? (
                    <TinyButton onClick={() => setAssigningUser(job)}>
                      Assign User
                    </TinyButton>
                  ) : (
                    <p>Assigned To: {job.user.fullName}</p>
                  )}
                </div>
              </>
            }
          />
        ))}
      {!loading && jobs.length === 0 && <p>There are no jobs.</p>}
      {!loading && jobs.length > 0 && limit > 0 && (
        <p>
          <small>
            Showing up to {limit} jobs.{' '}
            <Link href="/jobs">
              <a style={{ display: 'inline' }}>Click to view all.</a>
            </Link>
          </small>
        </p>
      )}
      <Dialog
        isOpen={!!assigningUser}
        onDismiss={() => setAssigningUser(false)}
      >
        {assigningUser && (
          <Stack space="small">
            <h1>Assign user to job</h1>
            <form
              action=""
              onSubmit={async event => {
                event.preventDefault()

                if (!chosenUser) {
                  return
                }

                try {
                  const { errors } = await assignUser({
                    variables: {
                      userId: chosenUser.id,
                      jobs: [assigningUser.id],
                    },
                  })

                  if (!errors) {
                    toaster.notify('User assigned successfully')
                  }
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              <Stack space="small">
                <div>
                  {!loadingUsers &&
                    users.map(user => (
                      <label htmlFor={user.id} key={user.id}>
                        <Item
                          title={user.fullName}
                          actions={
                            <input
                              type="radio"
                              id={user.id}
                              name="user"
                              onChange={event => {
                                if (event.target.checked) {
                                  setChosenUser(user)
                                }
                              }}
                            />
                          }
                        />
                      </label>
                    ))}
                </div>
                <Row>
                  <Button type="submit" theme="PRIMARY">
                    Assign User
                  </Button>
                  <Button onClick={() => setAssigningUser(false)}>
                    Cancel
                  </Button>
                </Row>
              </Stack>
            </form>
          </Stack>
        )}
      </Dialog>
    </div>
  )
}
