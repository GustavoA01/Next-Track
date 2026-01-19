import { render } from "@testing-library/react";
import { MessageCard } from "../components/MessageCard";

describe("Message Card", () => {
  it("should render with given content and class names", () => {
    const { getByText, container } = render(
      <MessageCard
        cardClassName="card-class"
        cardContentClassName="content-class"
        textClassName="text-class"
        content="Test Message"
      />,
    );

    expect(getByText("Test Message")).toBeInTheDocument();
    expect(getByText("Test Message")).toHaveClass("text-class");
    expect(container.firstChild).toHaveClass("card-class");
    expect(container.querySelector(".content-class")).toBeInTheDocument();
    expect(container.querySelector(".text-class")).toBeInTheDocument();
  });
});
