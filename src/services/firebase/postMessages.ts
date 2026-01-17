import { addDoc, collection, Timestamp } from "firebase/firestore";
import { chatMessageCollection, db } from "./firebaseConfig";
import { LastRecommendationsType } from "@/data/types";

type PostMessagesParams = {
  playlistId: string;
  userMessageContent: string;
  chatResponse: string;
  recommendations: LastRecommendationsType[];
};

export const postMessages = async ({
  playlistId,
  userMessageContent,
  chatResponse,
  recommendations,
}: PostMessagesParams) => {
  try {
    await addDoc(
      collection(db, "playlists", playlistId, chatMessageCollection),
      {
        userMessage: userMessageContent,
        chatResponse: chatResponse,
        recommendations,
        createdAt: Timestamp.fromDate(new Date()),
      },
    );
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
