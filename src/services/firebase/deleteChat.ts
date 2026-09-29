import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';
import { firebaseKeys } from '../constantsKeys';

export const deleteChat = async (playlistId: string, userId: string) => {
  try {
    const queryWhere = query(
      collection(
        db,
        firebaseKeys.playlists,
        playlistId,
        firebaseKeys.chatMessagesCollection
      ),
      where(firebaseKeys.userId, '==', userId)
    );
    const querySnapshot = await getDocs(queryWhere);

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error deleting chat messages: ', error);
  }
};
