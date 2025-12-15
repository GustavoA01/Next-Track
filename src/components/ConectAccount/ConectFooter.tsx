import { Button } from "../ui/button"
import { DialogClose, DialogFooter } from "../ui/dialog"

export const ConectFooter = () => {
  return (
    <DialogFooter className="mt-4">
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button type="submit">Conectar</Button>
    </DialogFooter>
  )
}
