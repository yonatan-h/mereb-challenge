import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('shows star wars', () => {
    render(<Hero />);
    const titleElement = screen.getByText(/star/i);
    expect(titleElement).toBeInTheDocument();
})