import { NextImgProps } from "@/globalTestsMocks";
import { render } from "@testing-library/react";
import { PlaylistCard } from "../PlaylistCard";

jest.mock("next/image", () => ({ src, alt, width, height }: NextImgProps) => (
  <img src={src} width={width} height={height} alt={alt} />
));

describe("PlaylistCard", () => {
  it("renders component with correct props", () => {
    const { getByText, getByAltText, getByRole } = render(
      <PlaylistCard
        id="1234"
        playlistName="Metallica"
        totalTracks={10}
        playlistImage="https://github.com/shadcn.png"
      />,
    );

    expect(getByText("Metallica")).toBeInTheDocument();
    expect(getByText("10 músicas")).toBeInTheDocument();
    expect(getByAltText("Metallica")).toHaveAttribute(
      "src",
      "https://github.com/shadcn.png",
    );
    expect(getByRole("link")).toHaveAttribute("href", "playlist/1234");
  });
});
