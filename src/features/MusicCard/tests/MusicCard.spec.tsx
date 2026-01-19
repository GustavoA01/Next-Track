import { fireEvent, render, screen } from "@testing-library/react";
import { MusicCard } from "../container/MusicCard";

describe("MusicCard", () => {
  const defaultProps = {
    index: 0,
    imageUrl: "https://fakeimg.com/album.jpg",
    musicName: "Test Song",
    artistName: "Test Artist",
    duration: "3:45",
    onClick: jest.fn(),
    onAddToPlaylist: jest.fn(),
  };

  it("deve renderizar corretamente com as props", () => {
    render(<MusicCard {...defaultProps} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("3:45")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // index + 1
    expect(screen.getByAltText("Foto do álbum")).toBeInTheDocument();
  });

  it("deve chamar onClick ao clicar no card", () => {
    render(<MusicCard {...defaultProps} />);

    const card = screen.getByTestId("music-card");
    fireEvent.click(card);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("deve chamar onAddToPlaylist ao clicar no botão de adicionar", () => {
    render(<MusicCard {...defaultProps} />);

    const addBtn = screen.getByTestId("add-to-playlist-button");
    fireEvent.click(addBtn);

    expect(defaultProps.onAddToPlaylist).toHaveBeenCalled();
  });
});
