import { render, screen } from '@testing-library/react';
import LoadingError from './LoadingError';

test('refresh button is called',()=>{
    const mockRefresh = jest.fn();
    render(<LoadingError refresh={mockRefresh} />);
    const buttonElement = screen.getByText(/Refresh/)
    buttonElement.click();
    expect(mockRefresh).toHaveBeenCalledTimes(1);
}) 