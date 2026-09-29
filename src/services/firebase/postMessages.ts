import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from './config';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { firebaseKeys } from '../constantsKeys';

type PostMessagesParams = {
  playlistId: string;
  userId: string;
  userMessageContent: string;
  chatResponse: string;
  recommendations: SpotifyPlaylistTrack[];
};

export const postMessages = async ({
  playlistId,
  userId,
  userMessageContent,
  chatResponse,
  recommendations,
}: PostMessagesParams) => {
  try {
    await addDoc(
      collection(
        db,
        firebaseKeys.playlists,
        playlistId,
        firebaseKeys.chatMessagesCollection
      ),
      {
        userId,
        userMessage: userMessageContent,
        chatResponse: chatResponse,
        recommendations,
        createdAt: Timestamp.fromDate(new Date()),
      }
    );
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
