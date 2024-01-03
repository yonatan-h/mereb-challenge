import { render, screen } from '@testing-library/react';
import StarBackground from './StarBackground';

test('shows all stars', () => {

    render(<StarBackground count={10} />);
    
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(10);
})