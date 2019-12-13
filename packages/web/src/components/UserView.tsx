import {
  UserInfoFragment,
  UserJobsFragment,
  UserMilesFragment,
} from '@trakrite/queries'
import Link from 'next/link'
import { Card } from './Card'
import { OpenJobs } from './OpenJobs'
import { Stack } from './Stack'
import { UserJobs } from './UserJobs'
import { UserMiles } from './UserMiles'
import { UserInfoCard } from './UserInfoCard'

export const UserView = ({
  user,
}: {
  user: UserInfoFragment & UserMilesFragment & UserJobsFragment
}) => {
  return (
    <div className="boxWrap">
      <UserInfoCard user={user} />
      <Card>
        <Stack space="small">
          <h1>
            <Link href="/open-jobs">
              <a>Open Jobs</a>
            </Link>
          </h1>
          <OpenJobs user={user} limit={5} />
        </Stack>
      </Card>
      <Card>
        <Stack space="small">
          <h1>
            <Link href="/jobs">
              <a>My Jobs</a>
            </Link>
          </h1>
          <UserJobs user={user} limit={5} />
        </Stack>
      </Card>
      <Card>
        <Stack space="small">
          <h1>
            <Link href="/miles">
              <a>My Miles</a>
            </Link>
          </h1>
          <UserMiles user={user} limit={5} />
        </Stack>
      </Card>
      <style jsx>{`
        .boxWrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, 1fr);
          grid-gap: 1em;
        }

        @media screen and (min-width: 450px) {
          .boxWrap {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
            grid-gap: 1em;
          }
        }
      `}</style>
    </div>
  )
}
