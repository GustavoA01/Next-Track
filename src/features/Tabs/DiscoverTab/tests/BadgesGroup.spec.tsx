import { render, screen } from "@testing-library/react";
import { BadgesGroup } from "../components/BadgesGroup";

describe("BadgesGroup", () => {
  it("renders component correctly", () => {
    render(<BadgesGroup onSelectBadge={jest.fn()} />);

    expect(screen.getByText("Faça recomendações")).toBeInTheDocument();
    expect(
      screen.getByText("Recomendações do artista mais presente"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Recomendações do gênero mais presente"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Músicas fáceis de tocar no violão"),
    ).toBeInTheDocument();
  });

  it("calls onSelectBadge when a badge is clicked", () => {
    const onSelectBadgeMock = jest.fn();
    render(<BadgesGroup onSelectBadge={onSelectBadgeMock} />);
    const badge = screen.getByText("Faça recomendações");

    badge.click();
    expect(onSelectBadgeMock).toHaveBeenCalledWith("Faça recomendações");
  });
});
