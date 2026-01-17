import SpotifyPlayer from "react-spotify-web-playback"

export const Player = ({ token, uris }: { token: string; uris: string[] }) => (
  <div className="w-full h-auto bg-black/30 rounded-lg p-2 mt-4">
    <SpotifyPlayer
      token={token}
      uris={uris}
      play={true}
      callback={(state) => {
        if (state.error) console.error("Erro no Player:", state.error)
        if (!state.isPlaying) console.log("Player parado", state)
      }}
      styles={{
        bgColor: "transparent",
        activeColor: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackNameColor: "#fff",
        errorColor: "#f00",
      }}
    />
  </div>
)
