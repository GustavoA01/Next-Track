import { fireEvent, render, screen } from '@testing-library/react';
import { ScrollToTop } from '../ScrollToTop';
import { scrollToTop } from '@/utils/scrollToTop';

jest.mock('@/utils/scrollToTop', () => ({
  scrollToTop: jest.fn(),
}));

describe('ScrollToTop', () => {
  it('should call scrollToTop when clicked', () => {
    render(<ScrollToTop />);

    fireEvent.click(screen.getByRole('button'));

    expect(scrollToTop).toHaveBeenCalledTimes(1);
  });
});
