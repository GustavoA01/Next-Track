import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { chatMessageCollection, db } from "./firebaseConfig";
import { ChatContentResponse } from "@/data/types";

export const getMessages = async (playlistId: string) => {
  try {
    const queryWhere = query(
      collection(db, "playlists", playlistId, chatMessageCollection),
      orderBy("createdAt", "asc"),
    );
    const querySnapshot = await getDocs(queryWhere);
    const messages = querySnapshot.docs.map((doc) => doc.data());

    return messages as ChatContentResponse[];
  } catch (error) {
    console.error("Error getting messages: ", error);
    return [] as ChatContentResponse[];
  }
};
