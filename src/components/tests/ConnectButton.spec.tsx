import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConnectAccountButton } from "../ConnectAccountButton";
import { redirectToAuthCodeFlow } from "../../actions/redirectFlow";

jest.mock("../../actions/redirectFlow", () => ({
  redirectToAuthCodeFlow: jest.fn(),
}));

describe("ConnectButton", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv, NEXT_PUBLIC_SPOTIFY_CLIENT_ID: "test-id" };
  });

  it("should render correctly", () => {
    render(<ConnectAccountButton />);
    expect(screen.getByText("Conectar")).toBeInTheDocument();
  });

  it("should calls handleAction on click", async () => {
    render(<ConnectAccountButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(redirectToAuthCodeFlow).toHaveBeenCalled();
    });
  });
});
