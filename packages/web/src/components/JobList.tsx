import { useJobsQuery } from '@trakrite/queries'
import { Item } from './Item'
import { date } from '../lib/formatters'
import Link from 'next/link'

export const JobList = ({
  limit = undefined,
}: {
  limit?: number | undefined
}) => {
  const { data, loading } = useJobsQuery()
  const jobs = data?.jobs?.nodes ?? []

  return (
    <div>
      {loading && 'Loading jobs...'}
      {!loading &&
        jobs.length > 0 &&
        jobs
          .slice(0, limit)
          .map(job => (
            <Item
              key={job.id}
              title={job.name}
              subtitle={job.customerName}
              right={date(job.recievedOn)}
            />
          ))}
      {!loading && jobs.length === 0 && <p>There are no jobs.</p>}
      {!loading && jobs.length > 0 && (
        <p>
          <small>
            Showing up to {limit} jobs.{' '}
            <Link href="/jobs">
              <a style={{ display: 'inline' }}>Click to view all.</a>
            </Link>
          </small>
        </p>
      )}
    </div>
  )
}
