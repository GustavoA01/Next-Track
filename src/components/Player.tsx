import SpotifyPlayer from "react-spotify-web-playback";

export const Player = ({ token, uris }: { token: string; uris: string[] }) => {
  return (
    <SpotifyPlayer
      key={uris[0]}
      token={token}
      uris={uris}
      play={true}
      styles={{
        bgColor: "transparent",
        activeColor: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
      }}
    />
  );
};
