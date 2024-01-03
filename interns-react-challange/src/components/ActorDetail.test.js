import { render, screen } from '@testing-library/react'
import ActorDetail from './ActorDetail'

const actor = {
  name: 'luke',
  height: '172',
  birthYear: '1900',
  gender: 'male',
  imageUrl: 'abc',
  filmUrls: [],
  mass: '77',
  skinColor: 'fair',
  hairColor: 'blond',
}

test('shows all properties', () => {
  render(<ActorDetail actor={actor} />)
  //check if the names exist
  const nameElement = screen.getByText(/luke/i)
  expect(nameElement).toBeInTheDocument()

  const ageElement = screen.getByText(/172/i)
  expect(ageElement).toBeInTheDocument()

  const genderElement = screen.getByText(/male/)
  expect(genderElement).toBeInTheDocument()

  const massElement = screen.getByText(/77/i)
  expect(massElement).toBeInTheDocument()

  const skinColorElement = screen.getByText(/fair/i)
  expect(skinColorElement).toBeInTheDocument()

  const hairColorElement = screen.getByText(/blond/i)
  expect(hairColorElement).toBeInTheDocument()
})

test('close button works',()=>{
    const mockClose = jest.fn();
    render(<ActorDetail actor={actor} close={mockClose} />)

    const closeButton = screen.getByTestId('close-details')
    closeButton.click()

    expect(mockClose).toHaveBeenCalledTimes(1)
})
 