import { render, screen } from "@testing-library/react";
import { AlbumImg } from "../components/AlbumImg";
import { NextImgProps } from "@/globalTestsMocks";

jest.mock("next/image", () => ({ src, alt, width, height }: NextImgProps) => (
  <img src={src} width={width} height={height} alt={alt} />
));

describe("AlbumImg", () => {
  it("renders component with correct attributes", () => {
    render(<AlbumImg src="https://github.com/shadcn.png" />);

    expect(screen.getByAltText("Foto do álbum")).toHaveAttribute(
      "src",
      "https://github.com/shadcn.png",
    );
    expect(screen.getByTestId("svg-play")).toHaveClass("lucide", "lucide-play");
  });
});
