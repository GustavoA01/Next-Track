import { render, screen } from "@testing-library/react";
import { ProfileMenuTrigger } from "../components/ProfileMenuTrigger";

describe("ProfileTrigger", () => {
  it("Renders component with correct data", () => {
    const mockProfile = {
      images: [{ url: "https://example.com/image.jpg" }],
      display_name: "John Doe",
    };

    render(<ProfileMenuTrigger profile={mockProfile} />);
    expect(screen.getByTestId("profile-menu-trigger")).toBeInTheDocument();
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("Renders component with className prop", () => {
    const mockProfile = {
      images: [{ url: "https://example.com/image.jpg" }],
      display_name: "John Doe",
    };

    render(<ProfileMenuTrigger profile={mockProfile} className="test-class" />);
    expect(screen.getByTestId("profile-menu-trigger")).toHaveClass(
      "test-class",
    );
  });
});
