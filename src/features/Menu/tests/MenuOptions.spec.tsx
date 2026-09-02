import { render, screen } from '@testing-library/react';
import { MenuOptions } from '../container/MenuOptions';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/playlist/123 '),
}));

const profile = {
  images: [{ url: 'https://example.com/u.png' }],
  display_name: 'Gustavo',
};

describe('MenuOptions (integration)', () => {
  it('renders both menu triggers (tooltip and drawer)', () => {
    render(<MenuOptions profile={profile} />);
    const triggers = screen.getAllByTestId('profile-menu-trigger');

    expect(triggers.length).toBe(2);
  });
});
