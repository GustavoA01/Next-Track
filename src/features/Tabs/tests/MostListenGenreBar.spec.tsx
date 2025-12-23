import { render, screen } from "@testing-library/react";
import { MostListenGenreBar } from "../components/MostListenGenreBar";

describe("MostListenGenreBar", () => {
  it("renders component with correct attributes", () => {
    render(<MostListenGenreBar name="Rock" value={50} />);
    const component = screen.getByTestId("genre-bar");

    expect(component).toHaveTextContent("Rock");
    expect(component).toHaveTextContent("50%");
  });
});
