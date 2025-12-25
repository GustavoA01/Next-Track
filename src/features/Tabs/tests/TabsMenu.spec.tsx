import { fireEvent, render, screen } from "@testing-library/react";
import { TabsMenu } from "../container/TabsMenu";
import { SpotifyPlaylist } from "@/data/types/spotify";

jest.mock("../container/DiscoverContent", () => ({
  DiscoverContent: () => <div data-testid="discover-content" />,
}));

jest.mock("../container/StatisticContent", () => ({
  StatisticContent: () => <div data-testid="statistics-content" />,
}));

const mockPlaylist: SpotifyPlaylist = {
  id: "p1",
  name: "Playlist",
  description: "",
  owner: {
    display_name: "Owner",
    id: "o1",
    external_urls: { spotify: "" },
    href: "",
    type: "user",
    uri: "",
  },
  tracks: {
    href: "",
    primary_color: "",
    total: 10,
    items: [],
  },
  href: "",
  images: [],
  type: "playlist",
  uri: "",
  public: true,
  collaborative: false,
  snapshot_id: "",
  external_urls: { spotify: "" },
};

const baseProps = {
  playlist: mockPlaylist,
  genresStatistics: [{ name: "rock", value: 10, percentage: 50 }],
  artistsStatistics: [
    { id: "a1", name: "Artist 1", count: 2, image: "", spotifyUrl: "" },
  ],
  chatContent: <div data-testid="chat-content" />,
};

describe("TabsMenu", () => {
  it("renders both tabs and default active is Descobrir", () => {
    render(<TabsMenu {...baseProps} />);
    const discoverBtn = screen.getByRole("button", { name: /Descobrir/i });
    const statsBtn = screen.getByRole("button", { name: /Estatísticas/i });

    expect(discoverBtn).toBeInTheDocument();
    expect(statsBtn).toBeInTheDocument();
    expect(discoverBtn).toHaveClass("border-primary", "text-white/80");
    expect(statsBtn).toHaveClass("border-transparent");

    expect(screen.getByTestId("discover-content")).toBeInTheDocument();
    expect(screen.getByTestId("statistics-content")).toBeInTheDocument();
  });

  it("changes active tab styles when clicking Estatísticas", () => {
    render(<TabsMenu {...baseProps} />);
    const discoverBtn = screen.getByRole("button", { name: /Descobrir/i });
    const statsBtn = screen.getByRole("button", { name: /Estatísticas/i });

    fireEvent.click(statsBtn);

    expect(statsBtn).toHaveClass("border-primary", "text-white/80");
    expect(discoverBtn).toHaveClass("border-transparent");
  });
});
