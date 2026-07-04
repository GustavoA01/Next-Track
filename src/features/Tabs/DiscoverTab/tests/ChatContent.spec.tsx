import { render, screen } from '@testing-library/react';
import { ChatContent } from '../container/ChatContent';
import { Timestamp } from 'firebase/firestore';
import { mockTracks } from '@/globalTestsMocks';

HTMLElement.prototype.scrollTo = jest.fn();

describe('ChatContent', () => {
  const mockMessages = [
    {
      userId: 'user-1',
      playlistId: '1',
      userMessage: 'Faça recomendações',
      chatResponse: 'Resposta do chat',
      createdAt: Timestamp.now(),
      recommendations: mockTracks.items.map((item) => item.track),
    },
  ];

  it('renders message correctly', () => {
    render(
      <ChatContent
        errorMessage=""
        isLoading={false}
        messages={mockMessages}
        setOpenConfirmDialog={jest.fn()}
        temporaryMessage=""
      />
    );

    expect(screen.getByText('Faça recomendações')).toBeInTheDocument();
    expect(screen.getByText('Resposta do chat')).toBeInTheDocument();
  });

  it('renders temporary message if provided', () => {
    render(
      <ChatContent
        errorMessage=""
        isLoading={false}
        messages={mockMessages}
        setOpenConfirmDialog={jest.fn()}
        temporaryMessage="Mensagem temporária"
      />
    );

    expect(screen.getByText('Mensagem temporária')).toBeInTheDocument();
  });

  it('renders loading skeleton when isLoading is true', () => {
    render(
      <ChatContent
        errorMessage=""
        isLoading={true}
        messages={mockMessages}
        setOpenConfirmDialog={jest.fn()}
        temporaryMessage=""
      />
    );

    expect(screen.getByText('Buscando músicas...')).toBeInTheDocument();
  });

  it('renders error message when errorMessage is provided', () => {
    render(
      <ChatContent
        errorMessage="Erro ao buscar"
        isLoading={false}
        messages={mockMessages}
        setOpenConfirmDialog={jest.fn()}
        temporaryMessage=""
      />
    );

    expect(screen.getByText('Erro ao buscar')).toBeInTheDocument();
  });

  it('calls setOpenConfirmDialog when trash button is clicked', () => {
    const mockSetOpen = jest.fn();
    render(
      <ChatContent
        errorMessage=""
        isLoading={false}
        messages={mockMessages}
        setOpenConfirmDialog={mockSetOpen}
        temporaryMessage=""
      />
    );

    const button = screen.getByRole('button');
    button.click();

    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });
});
