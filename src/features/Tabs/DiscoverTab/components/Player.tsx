import SpotifyPlayer from 'react-spotify-web-playback';
import { PlayerProps } from '../types';
import { playerStyles } from '@/data/constants';

export const Player = ({ token, uris }: PlayerProps) => (
  <div className="w-full h-auto bg-black/30 rounded-lg p-2 mt-4">
    <SpotifyPlayer
      uris={uris}
      play={true}
      token={token}
      styles={playerStyles}
      callback={({ error }) => error && console.error('Erro no Player:', error)}
    />
  </div>
);
