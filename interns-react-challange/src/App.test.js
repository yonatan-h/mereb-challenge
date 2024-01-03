import { render, screen } from '@testing-library/react';
import App from './App';

test('shows hero section', () => {
  render(<App />);
  const heroElement = screen.getByText(/star/i);
  expect(heroElement).toBeInTheDocument();
});
