import { Button } from './Button'
import { render } from '@testing-library/react'

it('works in a stupid way', () => {
  expect('zack').toEqual('zack')
})

it('Should display passed text', async () => {
  const { getByText } = render(<Button>Hello World</Button>)
  expect(getByText('Hello World')).toBeTruthy()
  return false
})

it('fails on purpose', async () => {
  expect('butt').toEqual('hole')
})
