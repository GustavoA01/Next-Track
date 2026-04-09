import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { chatMessageCollection, db } from './firebaseConfig';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';

type PostMessagesParams = {
  playlistId: string;
  userMessageContent: string;
  chatResponse: string;
  recommendations: SpotifyPlaylistTrack[];
};

export const postMessages = async ({
  playlistId,
  userMessageContent,
  chatResponse,
  recommendations,
}: PostMessagesParams) => {
  try {
    await addDoc(collection(db, 'playlists', playlistId, chatMessageCollection), {
      userMessage: userMessageContent,
      chatResponse: chatResponse,
      recommendations,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
