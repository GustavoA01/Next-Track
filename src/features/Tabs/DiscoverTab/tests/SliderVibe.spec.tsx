import { render, screen } from "@testing-library/react";
import { resizeObserverMock } from "@/globalTestsMocks";
import { SliderVibe } from "../components/SliderVibe";

describe("SliderVibe", () => {
  beforeAll(() => {
    resizeObserverMock();
  });

  it("Tests slider vibe component rendering", () => {
    const mockLeftLabel = "CALMO TESTE";
    const mockRightLabel = "AGITADO TESTE";

    render(
      <SliderVibe
        value={20}
        setValue={jest.fn()}
        leftLabel={mockLeftLabel}
        rightLabel={mockRightLabel}
      />,
    );

    expect(screen.getByText(mockLeftLabel)).toBeInTheDocument();
    expect(screen.getByText(mockRightLabel)).toBeInTheDocument();
  });
});
