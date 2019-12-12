import {
  UserInfoFragment,
  useAddJobMutation,
  PayStatus,
} from '@trakrite/queries'
import { useState, FormEventHandler } from 'react'
import { format, formatISO } from 'date-fns'
import { Stack } from './Stack'
import { Input } from './Input'
import { Button } from './Button'

export const AddJobForm = ({ userId }: UserInfoFragment['id']) => {
  const [addJob] = useAddJobMutation()
  const [paymentStatus, setPaymentStatus] = useState<PayStatus>(
    PayStatus.Cancelled
  )
  const [notes, setNotes] = useState('')
  const [progress, setProgress] = useState('')
  const [recievedOn, setRecievedOn] = useState(format(new Date(), 'yyyy-MM-dd'))

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
            paymentStatus,
            notes,
            progress,
            recievedOn: formatISO(new Date(recievedOn)) + '.000',
          },
        },
        refetchQueries: ['CurrentUser'],
      })

      if (job && !errors) {
        alert('success!')
        setPaymentStatus(PayStatus.Cancelled)
        setNotes('')
        setProgress('')
        setRecievedOn(format(new Date(), 'yyyy-MM-dd'))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack space="small">
        <h1>Add jobs</h1>

        <label htmlFor="payStatus">
          <select name="payStatus" value={paymentStatus}>
            <option value={PayStatus.Waiting} selected>
              {PayStatus.Waiting}
            </option>
            <option value={PayStatus.Pending}>{PayStatus.Pending}</option>
            <option value={PayStatus.Cancelled}>{PayStatus.Cancelled}</option>
            <option value={PayStatus.Invoiced}>{PayStatus.Invoiced}</option>
            <option value={PayStatus.Paid}>{PayStatus.Paid}</option>
          </select>
        </label>
        <Input
          label="Notes"
          name="notes"
          value={notes}
          onChange={event => setNotes(event.currentTarget.value)}
        />
        <Input
          label="Job Progress"
          name="progress"
          value={progress}
          onChange={event => setProgress(event.currentTarget.value)}
        />
        <Input
          label="Date"
          name="date"
          value={recievedOn}
          onChange={event => setRecievedOn(event.target.value)}
          type="date"
        />
        <Button type="submit" theme="PRIMARY">
          Add jobs
        </Button>
      </Stack>
    </form>
  )
}
