import { render, screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import { QClientProvider } from '../QClientProvider';

const QueryClientConsumer = () => {
  const queryClient = useQueryClient();

  return (
    <div data-testid="query-client-status">
      {queryClient ? 'connected' : 'disconnected'}
    </div>
  );
};

describe('QClientProvider', () => {
  it('should provide a QueryClient to children', () => {
    render(
      <QClientProvider>
        <QueryClientConsumer />
      </QClientProvider>
    );

    expect(screen.getByTestId('query-client-status')).toHaveTextContent(
      'connected'
    );
  });

  it('should render children', () => {
    render(
      <QClientProvider>
        <p>child content</p>
      </QClientProvider>
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
