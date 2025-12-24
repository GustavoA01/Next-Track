import { render, screen } from "@testing-library/react";
import { HeaderPlaylistInfo } from "../Header/HeaderPlaylistInfo";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { mockTracks } from "@/globalTestsMocks";

describe("HeaderPlaylistInfo", () => {
  const mockPlaylist: SpotifyPlaylist = {
    id: "playlist123",
    name: "My Playlist",
    description: "A cool playlist",
    owner: {
      display_name: "User123",
      id: "user123",
      external_urls: { spotify: "https://spotify.com/user/user123" },
      href: "",
      type: "user",
      uri: "",
    },
    tracks: mockTracks,
    href: "",
    images: [],
    type: "playlist",
    uri: "spotify:playlist:playlist123",
    public: true,
    collaborative: false,
    snapshot_id: "snapshot123",
    external_urls: { spotify: "https://spotify.com/playlist/playlist123" },
  };

  beforeEach(() => {
    render(<HeaderPlaylistInfo playlist={mockPlaylist} timeText="26h 30min" />);
  });

  it("renders component correctly", () => {
    expect(screen.getByText("Criada por")).toBeInTheDocument();
    expect(screen.getByText("User123")).toBeInTheDocument();
    expect(screen.getByText("3 músicas")).toBeInTheDocument();
    expect(screen.getByText("26h 30min")).toBeInTheDocument();
  });

  it("renders component with correct attributes", () => {
    const createdByText = screen.getByText("Criada por");
    const ownerName = screen.getByText("User123");
    const totalTracks = screen.getByText("3 músicas");
    const timeText = screen.getByText("26h 30min");

    expect(createdByText).toHaveClass("text-muted-foreground");
    expect(ownerName).toHaveClass("font-semibold md:text-lg");
    expect(totalTracks).toHaveClass("text-muted-foreground");
    expect(timeText).toHaveClass("text-muted-foreground");
  });
});
