import axios from "axios";

export const spotifyApi = axios.create({
  baseURL: "https://accounts.spotify.com/api",
})