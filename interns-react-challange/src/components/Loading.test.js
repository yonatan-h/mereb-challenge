import { render, screen } from '@testing-library/react';
import Loading from './Loading';

test('shows loading text', () => {
    render(<Loading refresh={()=>{}} />);
    const titleElement = screen.getByText(/loading/i);
    expect(titleElement).toBeInTheDocument();
})

