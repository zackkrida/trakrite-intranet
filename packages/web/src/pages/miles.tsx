import { Page } from '../components/Page'
import { UserMiles } from '../components/UserMiles'
import { Card } from '../components/Card'
import { Stack } from '../components/Stack'
import { withApollo } from '../lib/apollo'
import { useState } from 'react'
import { CreationOptions } from '../../types'
import { Button } from '../components/Button'
import Dialog from '@reach/dialog'
import { MileForm } from '../components/MileForm'

const Miles = () => {
  const [addingMiles, setAddingMiles] = useState<CreationOptions>('INACTIVE')

  return (
    <Page>
      {({ currentUser }) =>
        currentUser ? (
          <>
            <Card
              topRight={
                <Button
                  theme="PRIMARY"
                  onClick={() => setAddingMiles('ACTIVE')}
                >
                  Add Miles
                </Button>
              }
            >
              <Stack space="small">
                <h1>My Miles</h1>
                {currentUser ? <UserMiles user={currentUser} /> : <p>Uh oh.</p>}
              </Stack>
            </Card>
            <Dialog
              isOpen={addingMiles === 'ACTIVE'}
              onDismiss={() => setAddingMiles('INACTIVE')}
            >
              <MileForm
                userId={currentUser.id}
                onComplete={() => setAddingMiles('INACTIVE')}
              />
            </Dialog>
          </>
        ) : null
      }
    </Page>
  )
}

export default withApollo(Miles)
