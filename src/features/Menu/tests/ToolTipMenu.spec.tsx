import { render } from '@testing-library/react';
import { ToolTipMenu } from '../components/ToolTipMenu';
import { Tooltip } from '@/components/ui/tooltip';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/playlist/123 '),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('ToolTipMenu', () => {
  it('renders component correctly', () => {
    const setIsOpen = jest.fn();
    const { getAllByText } = render(
      <Tooltip open>
        <ToolTipMenu setIsOpen={setIsOpen} />
      </Tooltip>
    );

    const logoutButton = getAllByText('Sair da conta')[0];
    logoutButton.click();

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(getAllByText('Voltar ao início')[0]).toBeInTheDocument();
    expect(getAllByText('Voltar ao início')[0]).toHaveAttribute('href', '/');
  });
});
