import { render, screen } from "@testing-library/react";
import { SliderVibe } from "../components/SliderVibe";
import { resizeObserverMock } from "@/globalTestsMocks";

describe("SliderVibe", () => {
  beforeAll(() => {
    resizeObserverMock();
  });

  it("Tests slider vibe component rendering", () => {
    const mockLeftLabel = "CALMO TESTE";
    const mockRightLabel = "AGITADO TESTE";

    render(
      <SliderVibe leftLabel={mockLeftLabel} rightLabel={mockRightLabel} />,
    );

    expect(screen.getByText(mockLeftLabel)).toBeInTheDocument();
    expect(screen.getByText(mockRightLabel)).toBeInTheDocument();
  });
});
