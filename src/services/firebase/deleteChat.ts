import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { chatMessageCollection, db } from './firebaseConfig';

export const deleteChat = async (playlistId: string, userId: string) => {
  try {
    const queryWhere = query(
      collection(db, 'playlists', playlistId, chatMessageCollection),
      where('userId', '==', userId)
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
