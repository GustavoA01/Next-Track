import {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const ConfirmClearChat = ({ onConfirm }: { onConfirm: () => void }) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Limpar chat</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja limpar o chat? Esta ação não pode ser desfeita.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="destructive" onClick={onConfirm}>
          Limpar
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
)
