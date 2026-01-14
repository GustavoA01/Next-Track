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
  await addDoc(collection(db, chatMessageCollection), {
    playlistId,
    userMessage: userMessageContent,
    chatResponse: chatResponse,
    recommendations,
    createdAt: Timestamp.fromDate(new Date()),
  });
};
