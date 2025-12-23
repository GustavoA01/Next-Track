import { fireEvent, render, screen } from "@testing-library/react";
import { ConfirmLogOut } from "../components/ConfirmLogOut";
import { Dialog } from "@/components/ui/dialog";

describe("ConfirmLogout", () => {
  beforeEach(() => {
    render(
      <Dialog open>
        <ConfirmLogOut />
      </Dialog>,
    );
  });

  it("renders dialog correctly", () => {
    const title = screen.getByText("Sair da conta");
    const description = screen.getByText(
      "Deseja mesmo fazer logout da sua conta Spotify?",
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
