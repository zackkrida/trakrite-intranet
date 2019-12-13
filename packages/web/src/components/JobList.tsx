import { useJobsQuery } from '@trakrite/queries'
import { Item } from './Item'
import { date } from '../lib/formatters'

export const JobList = () => {
  const { data, loading } = useJobsQuery()
  const jobs = data?.jobs?.nodes ?? []

  return (
    <div>
      {loading && 'Loading jobs...'}
      {!loading &&
        jobs.length > 0 &&
        jobs.map(job => (
          <Item
            key={job.id}
            title={job.name}
            subtitle={job.customerName}
            right={date(job.recievedOn)}
          />
        ))}
      {!loading && jobs.length === 0 && <p>There are no jobs.</p>}
    </div>
  )
}
