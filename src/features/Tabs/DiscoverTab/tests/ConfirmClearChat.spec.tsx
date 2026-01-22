import { fireEvent, render, screen } from "@testing-library/react";
import { ConfirmClearChat } from "../components/ConfirmClearChat";
import { Dialog } from "@/components/ui/dialog";

describe("ConfirmClearChat", () => {
  const renderComponent = (onConfirm: () => void) => {
    return render(
      <Dialog open={true}>
        <ConfirmClearChat onConfirm={onConfirm} />
      </Dialog>,
    );
  };

  it("renders component correctly", () => {
    renderComponent(() => {});

    expect(screen.getByText("Limpar chat")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Tem certeza que deseja excluir o histórico de conversa? Esta ação não pode ser desfeita.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Limpar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("calls onConfirm when 'Limpar' button is clicked", () => {
    const onConfirmMock = jest.fn();
    renderComponent(onConfirmMock);

    const clearButton = screen.getByText("Limpar");
    fireEvent.click(clearButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });
});
