import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  id: '/',
  name: 'Next Track',
  short_name: 'Next Track',
  description:
    'Descubra novas músicas com inteligência artificial baseada nas suas playlists do Spotify.',
  lang: 'pt-BR',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#121212',
  theme_color: '#121212',
  icons: [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
  ],
});

export default manifest;
