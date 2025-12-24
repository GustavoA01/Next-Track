import { render, screen } from "@testing-library/react";
import { MusicInfo } from "../components/MusicInfo";

describe("MusicInfo", () => {
  beforeEach(() => {
    render(
      <MusicInfo
        musicName="Nome música teste"
        artistName="Nome artista teste"
      />,
    );
  });

  it("renders component with correct props", () => {
    const components = screen.getAllByRole("paragraph");

    expect(components[0]).toHaveTextContent("Nome música teste");
    expect(components[1]).toHaveTextContent("Nome artista teste");
  });

  it("renders component with correct className", () => {
    const components = screen.getAllByRole("paragraph");

    expect(components[0]).toHaveClass("font-semibold line-clamp-2");
    expect(components[1]).toHaveClass("text-muted-foreground line-clamp-1");
  });
});
