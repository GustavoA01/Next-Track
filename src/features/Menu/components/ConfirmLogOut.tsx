import { Button } from "@/components/ui/button";
import { doLogout } from "@/actions/doLogout";
import {
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const ConfirmLogOut = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Sair da conta</DialogTitle>
      <DialogDescription>
        Deseja mesmo fazer logout da sua conta Spotify?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button onClick={doLogout} variant="destructive">
          Sair
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);
