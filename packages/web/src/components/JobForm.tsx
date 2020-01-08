import {
  JobInfoFragment,
  PayStatus,
  useEditJobMutation,
  useAddJobMutation,
} from '@trakrite/queries'
import { useState, FormEventHandler } from 'react'
import toaster from 'toasted-notes'
import { Stack } from './Stack'
import { Input } from './Input'
import { Row } from './Row'
import { Button } from './Button'
import format from 'date-fns/format'
import { useApolloClient } from '@apollo/react-hooks'

export const JobForm = ({
  job,
  onComplete,
}: {
  job?: JobInfoFragment
  onComplete: () => void
}) => {
  // Form fields
  const [name, setName] = useState(job ? job.name : '')
  const [customerName, setCustomerName] = useState(job ? job.customerName : '')
  const [customerPhone, setCustomerPhone] = useState(
    job ? job.customerPhone : ''
  )
  const [customerEmail, setCustomerEmail] = useState(
    job ? job.customerEmail : ''
  )
  const [customerAddress, setCustomerAddress] = useState(
    job ? job.customerAddress : ''
  )
  const [jobAddress, setJobAddress] = useState(job ? job.jobAddress : '')

  const [recievedOn, setRecievedOn] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [notes, setNotes] = useState(job ? job.notes : '')
  const [paymentStatus, setPaymentStatus] = useState<PayStatus>(
    job ? job.paymentStatus : PayStatus.Waiting
  )
  const [progress, setProgress] = useState(job ? job.progress : '')

  const client = useApolloClient()

  // Job mutation
  const [editJob] = useEditJobMutation()
  const [addJob] = useAddJobMutation()

  const handleEdit: FormEventHandler = async event => {
    event.preventDefault()

    try {
      const { errors } = await editJob({
        variables: {
          id: job.id,
          patch: {
            name,
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            jobAddress,
            recievedOn,
            notes,
            paymentStatus,
            progress,
          },
        },
      })

      if (!errors) {
        client.reFetchObservableQueries()
        onComplete()
        toaster.notify('Job edited.')
      }
    } catch (error) {
      console.error(error)
      toaster.notify(`Error: ${error.message}`)
    }
  }

  const handleCreate: FormEventHandler = async event => {
    event.preventDefault()

    try {
      const { errors } = await addJob({
        variables: {
          job: {
            name,
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            jobAddress,
            recievedOn,
            notes,
            paymentStatus,
            progress,
          },
        },
      })

      if (!errors) {
        onComplete()
        toaster.notify('Job created.')
        client.reFetchObservableQueries()
      }
    } catch (error) {
      console.error(error)
      toaster.notify(`Error: ${error.message}`)
    }
  }

  return (
    <form action="" onSubmit={job ? handleEdit : handleCreate}>
      <Stack space="small">
        <Input
          label="Job Name/Description"
          value={name}
          onChange={event => setName(event.currentTarget.value)}
        />
        <Input
          label="Customer Name"
          value={customerName}
          onChange={event => setCustomerName(event.currentTarget.value)}
        />
        <Input
          label="Customer Phone"
          value={customerPhone}
          onChange={event => setCustomerPhone(event.target.value)}
        />
        <Input
          label="Customer Email"
          value={customerEmail}
          onChange={event => setCustomerEmail(event.target.value)}
        />
        <Input
          label="Customer Billing Address"
          value={customerAddress}
          onChange={event => setCustomerAddress(event.target.value)}
        />
        <Input
          label="Job Address"
          value={jobAddress}
          onChange={event => setJobAddress(event.target.value)}
        />

        <Input
          label="Recieved Date"
          name="date"
          value={recievedOn}
          onChange={event => setRecievedOn(event.target.value)}
          type="date"
        />

        <Input
          label="Notes / Job Description"
          value={notes}
          onChange={event => setNotes(event.currentTarget.value)}
        />

        <label style={{ display: 'block' }} htmlFor="payStatus">
          <span style={{ display: 'block', marginBottom: '.8em' }}>
            Payment Status
          </span>
          <select
            style={{ width: '100%', display: 'block', padding: '.8em' }}
            name="payStatus"
            value={paymentStatus}
            onChange={event =>
              setPaymentStatus(event.currentTarget.value as PayStatus)
            }
          >
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
          label="Progress Details"
          value={progress}
          onChange={event => setProgress(event.currentTarget.value)}
        />

        <Row>
          <Button type="submit" theme="PRIMARY">
            Save Job
          </Button>
          <Button onClick={onComplete}>Cancel</Button>
        </Row>
      </Stack>
    </form>
  )
}
