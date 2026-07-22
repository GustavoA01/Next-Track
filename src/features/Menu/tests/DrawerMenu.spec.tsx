import { render } from '@testing-library/react';
import { DrawerMenu } from '../components/DrawerMenu';
import { Drawer } from '@/components/ui/drawer';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/playlist/123 '),
}));

jest.mock('next/link', () => {
  function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  }
  return MockLink;
});

describe('DrawerMenu', () => {
  it('renders component correctly', () => {
    const setIsOpen = jest.fn();
    const { getAllByText } = render(
      <Drawer open>
        <DrawerMenu setIsOpen={setIsOpen} />
      </Drawer>
    );

    const logoutButton = getAllByText('Sair da conta')[0];
    logoutButton.click();

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(getAllByText('Voltar ao início')[0]).toBeInTheDocument();
    expect(getAllByText('Voltar ao início')[0]).toHaveAttribute('href', '/');
  });
});
