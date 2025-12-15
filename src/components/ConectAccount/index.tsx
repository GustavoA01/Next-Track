"use client"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ConectDialogHeader } from "./ConectDialogHeader"
import { ConectFooter } from "./ConectFooter"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { conectSpotifyAccount, redirectToAuthCodeFlow } from "@/actions/conectSpotifyAccount"
import { useForm } from "react-hook-form"
import { useState } from "react"

export const ConectAccount = () => {
  const { handleSubmit, register } = useForm<{ email: string }>()
  const [token, setToken] = useState<string | null>(null)

  const handleAction = async () => {
    try {
      const {SPOTIFY_CLIENT_ID} = process.env
      console.log(SPOTIFY_CLIENT_ID)
      if (!SPOTIFY_CLIENT_ID) {
        throw new Error("Client ID não está definido")
      }
      await redirectToAuthCodeFlow(SPOTIFY_CLIENT_ID)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button onClick={handleAction} type="submit">Conectar</Button>
  )
}
