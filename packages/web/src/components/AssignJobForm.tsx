import { Stack } from './Stack'
import {
  UserInfoFragment,
  useOpenJobsQuery,
  JobInfoFragment,
  useAssignJobsMutation,
} from '@trakrite/queries'
import { Item } from './Item'
import { useState } from 'react'
import { date } from '../lib/formatters'
import { Row } from './Row'
import { Button } from './Button'
import toaster from 'toasted-notes'
import { useApolloClient } from '@apollo/react-hooks'

export const AssignJobForm = ({
  user,
  onComplete,
}: {
  user: UserInfoFragment
  onComplete: () => void
}) => {
  const client = useApolloClient()
  const { data, loading } = useOpenJobsQuery({ fetchPolicy: 'network-only' })
  const [chosenJobs, setChosenJobs] = useState<JobInfoFragment[]>([])
  const jobs = data?.jobs?.nodes ?? []

  const [assignJobs] = useAssignJobsMutation()

  return (
    <form
      action=""
      onSubmit={async event => {
        event.preventDefault()
        if (chosenJobs.length === 0) {
          return
        }

        try {
          const { errors } = await assignJobs({
            variables: { userId: user.id, jobs: chosenJobs.map(i => i.id) },
          })

          if (!errors) {
            client.reFetchObservableQueries()
            toaster.notify('Jobs assigned successfully')
            onComplete()
          }
        } catch (error) {
          toaster.notify('Error')
          console.error(error.message)
        }
      }}
    >
      <Stack space="small">
        <h1>Assign job(s) to {user.fullName}</h1>

        {loading && <p>Loading jobs...</p>}

        {!loading && (
          <div>
            {jobs.length > 0 &&
              jobs.map(job => (
                <label
                  key={job.id}
                  style={{ cursor: 'pointer' }}
                  htmlFor={`checkbox-${job.id}`}
                >
                  <Item
                    title={job.name}
                    subtitle={job.customerName}
                    right={date(job.recievedOn)}
                    actions={
                      <input
                        name={`checkbox-${job.id}`}
                        id={`checkbox-${job.id}`}
                        type="checkbox"
                        checked={chosenJobs.includes(job)}
                        onChange={event => {
                          if (event.target.checked) {
                            setChosenJobs([...chosenJobs, job])
                          } else {
                            setChosenJobs([
                              ...chosenJobs.filter(
                                compare => compare.id !== job.id
                              ),
                            ])
                          }
                        }}
                      ></input>
                    }
                  />
                </label>
              ))}
            {jobs.length === 0 && <p>No open jobs at this time.</p>}
          </div>
        )}

        <Row>
          <Button
            disabled={chosenJobs.length === 0}
            type="submit"
            theme="PRIMARY"
          >
            Save
          </Button>
          <Button onClick={onComplete}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
