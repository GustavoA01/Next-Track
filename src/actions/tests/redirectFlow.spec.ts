import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { redirectToAuthCodeFlow } from '../redirectFlow';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
  RedirectType: { push: 'push', replace: 'replace' },
}));

const mockRedirect = jest.mocked(redirect);

const mockCookiesStore = {
  has: jest.fn(),
  set: jest.fn(),
};

describe('redirectToAuthCodeFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SPOTIFY_REDIRECT_URI = 'http://127.0.0.1:3000/callback';
    (cookies as jest.Mock).mockResolvedValue(mockCookiesStore);
    mockCookiesStore.has.mockReturnValue(false);
  });

  it('should redirect to home when user already has tokens', async () => {
    mockCookiesStore.has.mockImplementation(
      (key: string) => key === 'spotifyAccessToken'
    );

    await expect(redirectToAuthCodeFlow('client-id')).rejects.toThrow(
      'REDIRECT:/home'
    );

    expect(mockRedirect).toHaveBeenCalledWith('/home');
    expect(mockCookiesStore.set).not.toHaveBeenCalled();
  });

  it('should set verifier cookie and redirect to Spotify authorize URL', async () => {
    await expect(redirectToAuthCodeFlow('client-id')).rejects.toThrow(
      /REDIRECT:https:\/\/accounts\.spotify\.com\/authorize/
    );

    expect(mockCookiesStore.set).toHaveBeenCalledWith(
      'verifier',
      expect.any(String)
    );

    const [redirectUrl, redirectType] = mockRedirect.mock.calls[0];
    expect(redirectUrl).toContain('client_id=client-id');
    expect(redirectUrl).toContain(
      'redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback'
    );
    expect(redirectUrl).toContain('code_challenge_method=S256');
    expect(redirectUrl).toContain('code_challenge=');
    expect(redirectType).toBe(RedirectType.push);
  });
});
