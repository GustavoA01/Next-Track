import { render, screen } from "@testing-library/react";
import { StatisticSubTitle } from "../components/StatSubTitle";

describe("StatSubTitle", () => {
  it("Renders component with correct text", () => {
    const mockText = "Test Subtitle";

    render(<StatisticSubTitle text={mockText} />);

    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("Renders component eith correct className", () => {
    const mockText = "Test Subtitle";
    const correctClassName = "md:text-xl sm:text-lg font-bold mb-6";

    render(<StatisticSubTitle text={mockText} />);

    expect(screen.getByText(mockText)).toHaveClass(correctClassName);
  });

  it("Renders component with additional className", () => {
    const mockText = "Test Subtitle";
    const mockClassName = "text-red-500";

    render(<StatisticSubTitle text={mockText} className={mockClassName} />);
    const subtitleElement = screen.getByText(mockText);

    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement).toHaveClass(mockClassName);
  });
});
