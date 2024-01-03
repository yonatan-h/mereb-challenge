import { render, screen } from '@testing-library/react'
import ActorList from './ActorList'

test('shows actor names', () => {
  const actors = [
    {
      name: 'luke1',
      height: '1721',
      birthYear: '19bby1',
      url: '11',
    },
    {
      name: 'luke2',
      height: '1722',
      birthYear: '19bby2',
      url: '2',
    },
  ]
  render(<ActorList actors={actors} />)
  //check if the names exist
  const titleElement = screen.getByText(/luke1/i)
  expect(titleElement).toBeInTheDocument()

  const titleElement2 = screen.getByText(/luke2/i)
  expect(titleElement2).toBeInTheDocument()
})
