import { render, screen } from "@testing-library/react";
import { RightInfo } from "../components/RightInfo";

describe("RightInfo", () => {
  const onAddToPLaylistMock = jest.fn();

  it("renders duration text", () => {
    render(<RightInfo duration="3:45" onAddToPlaylist={onAddToPLaylistMock} />);
    const duration = screen.getByText("3:45");

    expect(duration).toBeInTheDocument();
    expect(duration).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("renders Plus icon inside interactive wrapper", () => {
    const { container } = render(
      <RightInfo duration="0:59" onAddToPlaylist={onAddToPLaylistMock} />,
    );
    const wrapper = container.querySelector(".group\\/add");
    const icon = container.querySelector("svg");

    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText("0:59")).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-4", "h-4");
    expect(wrapper).toHaveClass(
      "hover:bg-primary",
      "border",
      "border-primary",
      "rounded-full",
      "p-2",
    );
  });
});
