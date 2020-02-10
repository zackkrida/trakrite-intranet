import { Page } from '../components/Page'
import { UserHours } from '../components/UserHours'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'
import { useState } from 'react'
import { CreationOptions } from '../../types'
import { Button } from '../components/Button'
import Dialog from '@reach/dialog'
import { HourForm } from '../components/HourForm'

const Hours = () => {
  const [addingHours, setAddingHours] = useState<CreationOptions>('INACTIVE')

  return (
    <Page>
      {({ currentUser }) =>
        currentUser ? (
          <>
            <Card
              topRight={
                <Button
                  theme="PRIMARY"
                  onClick={() => setAddingHours('ACTIVE')}
                >
                  Add Hours
                </Button>
              }
            >
              <Stack space="small">
                <h1>My Hours</h1>
                {currentUser ? <UserHours user={currentUser} /> : <p>Uh oh.</p>}
              </Stack>
            </Card>
            <Dialog
              isOpen={addingHours === 'ACTIVE'}
              onDismiss={() => setAddingHours('INACTIVE')}
            >
              <HourForm
                userId={currentUser.id}
                onComplete={() => setAddingHours('INACTIVE')}
              />
            </Dialog>
          </>
        ) : null
      }
    </Page>
  )
}

export default withApollo(Hours)
