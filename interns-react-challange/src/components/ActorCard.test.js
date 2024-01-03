import { render, screen, act } from '@testing-library/react'
import ActorCard from './ActorCard'

const actor = {
  name: 'luke',
  height: '172',
  birthYear: '19bby',
  gender: 'male',
  imageUrl: 'abc',
  filmUrls: [],
  mass: '77',
  skinColor: 'fair',
  hairColor: 'blond',
}

test('shows properties', () => {
  render(<ActorCard actor={actor} />)
  const nameElement = screen.getByText(/luke/i)
  expect(nameElement).toBeInTheDocument()

  const heightElement = screen.getByText(/172/i)
  expect(heightElement).toBeInTheDocument()

  const birthYearElement = screen.getByText(/19bby/i)
  expect(birthYearElement).toBeInTheDocument()
})

test('has detail button', () => {
  render(<ActorCard actor={actor} />)
  const buttonElement = screen.getByText(/detail/i)
  expect(buttonElement).toBeInTheDocument()
})

test('click reaveals detail', () => {
  render(<ActorCard actor={actor} />)
  const buttonElement = screen.getByText(/detail/i)
  act(() => {
    buttonElement.click()
  })

  const actorDetailDiv = screen.getByTestId('actor-detail')
  expect(actorDetailDiv).toBeInTheDocument()
})
