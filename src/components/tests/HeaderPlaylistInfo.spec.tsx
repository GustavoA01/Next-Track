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

  it("renders with minutes-only timeText", () => {
    render(<HeaderPlaylistInfo playlist={mockPlaylist} timeText="45min" />);

    expect(screen.getByText("45min")).toBeInTheDocument();
  });

  it("renders with large track count", () => {
    const bigPlaylist = {
      ...mockPlaylist,
      tracks: { ...mockTracks, total: 12345 },
    };
    render(<HeaderPlaylistInfo playlist={bigPlaylist} timeText="12h 00min" />);

    expect(screen.getByText("12345 músicas")).toBeInTheDocument();
  });

  it("renders two separator icons", () => {
    const { container } = render(
      <HeaderPlaylistInfo playlist={mockPlaylist} timeText="10min" />,
    );
    const svgs = container.querySelectorAll("svg");

    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });
});
