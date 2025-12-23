import { render, screen } from "@testing-library/react";
import { PopularityChart } from "../components/PoupularityChart";
import { mockTracks, resizeObserverMock } from "@/globalTestsMocks";

describe("PopularityChart", () => {
  beforeAll(() => {
    resizeObserverMock();
  });

  it("should render PopularityChart component correctly", () => {
    render(<PopularityChart tracks={mockTracks} />);

    const chart = screen.getByTestId("popularity-chart");

    expect(chart).toBeInTheDocument();
  });
});
