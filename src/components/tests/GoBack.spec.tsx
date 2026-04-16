import { fireEvent, render, screen } from '@testing-library/react';
import { GoBack } from '../GoBack';

const goBackFn = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: goBackFn,
  }),
}));

describe('GoBack', () => {
  beforeEach(() => {
    render(<GoBack />);
  });

  it('renders component correctly', () => {
    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-left-icon')).toHaveClass(
      'lucide lucide-arrow-left text-primary'
    );
  });

  it('call back function when clicks the button', () => {
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(goBackFn).toHaveBeenCalled();
  });

  it('should have correct classes for styling', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full w-10 h-10');
  });
});
