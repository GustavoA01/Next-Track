import { collection, getDocs, writeBatch } from "firebase/firestore"
import { chatMessageCollection, db } from "./firebaseConfig"

export const deleteChat = async (playlistId: string) => {
  try {
    const messagesRef = collection(
      db,
      "playlists",
      playlistId,
      chatMessageCollection
    )
    const querySnapshot = await getDocs(messagesRef)

    const batch = writeBatch(db)
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()
  } catch (error) {
    console.error("Error deleting chat messages: ", error)
  }
}
