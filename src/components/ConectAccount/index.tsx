"use client"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ConectDialogHeader } from "./ConectDialogHeader"
import { ConectFooter } from "./ConectFooter"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { conectSpotifyAccount } from "@/actions/conectSpotifyAccount"
import axios from "axios"
import { useForm } from "react-hook-form"

export const ConectAccount = () => {
  const { handleSubmit, register } = useForm<{ email: string }>()
  const handleAction = async (data: { email: string }) => {
    try {
      console.log("data", data.email)
      // const response = await axios.post("/api/spotify-token")
      await conectSpotifyAccount(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Conectar com Spotify</Button>
      </DialogTrigger>

      <DialogContent>
        <ConectDialogHeader />

        <form onSubmit={handleSubmit(handleAction)}>
          <div className="space-y-4">
            <Label>Digite seu e-mail</Label>
            <Input type="email" {...register("email")} />
          </div>

          <ConectFooter />
        </form>
      </DialogContent>
    </Dialog>
  )
}
