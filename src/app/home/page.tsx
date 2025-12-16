import { fetchProfile } from "@/lib/spotify"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const Home = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("spotifyAccessToken")?.value
  if(!token) redirect("/")
  
  const profile = await fetchProfile(token)

  console.log("User Profile:", profile)

  return <div>Home Page</div>
}

export default Home