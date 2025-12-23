import { fireEvent, render, screen } from "@testing-library/react";
import { ArtistCard } from "../components/ArtistCard";

const mockArtist = {
  id: "1",
  name: "Test Artist",
  count: 10,
  href: "https://api.spotify.com/v1/artists/1",
  image: "https://spotify/image-artist-mock",
  spotifyUrl: "https://api.spotify.com/v1/artists/1",
};

jest.mock("next/image", () => {
  const mockImage = ({ src, alt, ...props }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} {...props} />;
  };
  return mockImage;
});

describe("ArtistCard", () => {
  beforeEach(() => {
    render(<ArtistCard artist={mockArtist} palleteColor="#121212" index={1} />);
  });

  it("should render correctly with given props", () => {
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByText(`${mockArtist.count} músicas`)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      mockArtist.spotifyUrl,
    );
  });

  it("renders image with correct attirbutes", () => {
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", mockArtist.image);
    expect(img).toHaveAttribute("alt", mockArtist.name);
    expect(img).toHaveAttribute("width", "150");
    expect(img).toHaveAttribute("height", "150");
  });

  it("should render background color with correct pallete attributes", () => {
    const bg = screen.getByTestId("header-bg-color");

    expect(bg).toHaveStyle(
      "background: linear-gradient(to top, #121212 60%, transparent 100%)",
    );
  });

  it("renders the correct artist position counter", () => {
    const counter = screen.getByTestId("artist-counter");

    expect(counter).toHaveTextContent("2");
    expect(counter).toHaveStyle("color: #121212; textShadow: 0 0 10px #121212");
  });

  it("should call a function when card is clicked", () => {
    const onClick = jest.fn();
    const link = screen.getByRole("link");

    link.addEventListener("click", onClick);
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });
});
