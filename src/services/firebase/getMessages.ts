import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './config';
import { ChatContentResponse } from '@/data/types';
import { firebaseKeys } from '../constantsKeys';

export const getMessages = async (playlistId: string, userId: string) => {
  try {
    const queryWhere = query(
      collection(
        db,
        firebaseKeys.playlists,
        playlistId,
        firebaseKeys.chatMessagesCollection
      ),
      where(firebaseKeys.userId, '==', userId),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(queryWhere);
    const messages = querySnapshot.docs.map((doc) => doc.data());

    return messages as ChatContentResponse[];
  } catch (error) {
    console.error('Error getting messages: ', error);
    return [] as ChatContentResponse[];
  }
};
