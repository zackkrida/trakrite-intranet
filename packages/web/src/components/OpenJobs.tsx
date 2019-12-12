import {
  UserInfoFragment,
  UserJobsFragment,
  useOpenJobsQuery,
} from '@trakrite/queries'
import format from 'date-fns/format'
import Link from 'next/link'

const date = (str: string) => {
  const date = new Date(str)

  if (date instanceof Date) {
    return format(date, 'MM/dd/yy')
  } else {
    throw Error('Invalid date')
  }
}

export const OpenJobs = ({
  user,
  limit = undefined,
}: {
  user: UserInfoFragment & UserJobsFragment
  limit?: number
}) => {
  const { data, loading } = useOpenJobsQuery()
  const jobs = data?.jobs?.nodes ?? []

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
                </span>{' '}
                {job.notes}
                <span style={{ marginLeft: 'auto' }}>
                  Pay Status: {job.paymentStatus}
                  {/* <DeleteButton onClick={() => handleDelete(job.id)} /> */}
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
        </>
      ) : (
        <>
          <p>No open jobs.</p>
        </>
      )}
    </>
  )
}
