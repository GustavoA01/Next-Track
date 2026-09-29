import { render, screen } from '@testing-library/react';
import { ToolTipMenu } from '../components/ToolTipMenu';
import { Tooltip } from '@/components/ui/tooltip';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return MockLink;
});

const renderMenu = (showBackButton: boolean) => {
  const setIsOpen = jest.fn();

  render(
    <Tooltip open>
      <ToolTipMenu showBackButton={showBackButton} setIsOpen={setIsOpen} />
    </Tooltip>
  );

  return { setIsOpen };
};

describe('ToolTipMenu', () => {
  it('renders the back button and opens logout confirm', () => {
    const { setIsOpen } = renderMenu(true);

    screen.getAllByText('Sair da conta')[0].click();

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(screen.getAllByText('Voltar ao início')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Voltar ao início')[0]).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('hides the back button when showBackButton is false', () => {
    renderMenu(false);

    expect(screen.queryByText('Voltar ao início')).not.toBeInTheDocument();
    expect(screen.getAllByText('Sair da conta')[0]).toBeInTheDocument();
  });
});
