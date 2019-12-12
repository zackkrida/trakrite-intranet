import { useState, FormEventHandler } from 'react'
import {
  UserInfoFragment,
  UserJobsFragment,
  useAddJobMutation,
  useDeleteJobMutation,
} from '@trakrite/queries'
import { CreationOptions } from '../../types'
import { Button } from './Button'
import Dialog from '@reach/dialog'
import { Input } from './Input'
import { Stack } from './Stack'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import Link from 'next/link'

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
  limit = -1,
}: {
  user: UserInfoFragment & UserJobsFragment
  limit?: number
}) => {
  const jobs = user.jobs.nodes
  const [addingJobs, setAddingJobs] = useState<CreationOptions>('INACTIVE')
  const [deleteJob] = useDeleteJobMutation()

  const handleDelete = async (id: number) => {
    try {
      const { data, errors } = await deleteJob({
        variables: { id },
        refetchQueries: ['CurrentUser'],
      })

      if (!errors) {
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {jobs.length > 0 ? (
        <>
          <ul>
            {jobs.slice(0, limit).map(job => (
              <li
                key={job.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  margin: '0 -16px',
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
                  {date(job.date)}
                </span>{' '}
                {job.info}{' '}
                <span style={{ marginLeft: 'auto' }}>
                  {job.distance}mi
                  <button
                    className="delete"
                    onClick={() => handleDelete(job.id)}
                  >
                    <span>+</span>
                    <style jsx>{`
                      .delete {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 1px solid #fff;
                        margin-left: 6px;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 4px;
                        line-height: 1;
                        display: inline-block;
                        border-radius: 4px;
                      }

                      .delete > span {
                        display: block;
                        transform: rotate(45deg);
                        transform-origin: center;
                      }

                      .delete:hover,
                      .delete:focus {
                        border: 1px solid #e3e3e3;
                        outline: 0;
                      }
                    `}</style>
                  </button>
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
      <Button onClick={() => setAddingJobs('ACTIVE')}>Add Jobs</Button>
      <Dialog
        isOpen={addingJobs === 'ACTIVE'}
        onDismiss={() => setAddingJobs('INACTIVE')}
      >
        <AddJobForm userId={user.id} />
      </Dialog>
    </>
  )
}

const AddJobForm = ({ userId }: UserInfoFragment['id']) => {
  const [addJob] = useAddJobMutation()
  const [distance, setDistance] = useState(0)
  const [info, setInfo] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault()
    try {
      const {
        data: {
          createJob: { job },
        },
        errors,
      } = await addJob({
        variables: {
          job: {
            userId,
            distance,
            info,
            date: formatISO(new Date(date)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser'],
      })

      if (job && !errors) {
        alert('success!')
        setDistance(0)
        setInfo('')
        setDate(format(new Date(), 'yyyy-MM-dd'))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack space="small">
        <h1>Add jobs</h1>

        <Input
          label="Distance (Round to the nearest job)"
          type="number"
          value={distance}
          onChange={event => setDistance(parseInt(event.currentTarget.value))}
        />
        <Input
          type="text"
          label="Description/Purpose of Trip"
          name="info"
          value={info}
          onChange={event => setInfo(event.currentTarget.value)}
        />
        <Input
          label="Date"
          name="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          type="date"
        />
        <Button type="submit" theme="PRIMARY">
          Add jobs
        </Button>
      </Stack>
    </form>
  )
}
