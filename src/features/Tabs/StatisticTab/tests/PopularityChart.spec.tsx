import { render, screen } from "@testing-library/react";
import { resizeObserverMock } from "@/globalTestsMocks";
import { PopularityChart } from "../components/PopularityChart";

describe("PopularityChart", () => {
  beforeAll(() => {
    resizeObserverMock();
  });

  it("should render PopularityChart component correctly", () => {
    const mockAvgMessage = {
      title: "Popularidade Média",
      text: "Popularidade média das músicas da sua playlist",
      textColor: "text-green-500",
    };

    const mockChartData = [
      { popularity: 20 },
      { popularity: 40 },
      { popularity: 60 },
      { popularity: 80 },
      { popularity: 100 },
    ];

    render(
      <PopularityChart avgMessage={mockAvgMessage} chartData={mockChartData} />,
    );

    const chart = screen.getByTestId("popularity-chart");

    expect(chart).toBeInTheDocument();
  });
});
