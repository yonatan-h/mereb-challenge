import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

test('shows all images', () => {
    render(<Gallery imageUrls={['a', 'b', 'c']} />);
    const images = screen.getAllByTestId('gallery-img')
    expect(images).toHaveLength(3);
})