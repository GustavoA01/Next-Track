import { getCurrentToken } from "@/lib/getCurrentToken"

const PlaylistPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const accessToken = await getCurrentToken()
  
  const playlistTracks = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
}).then(res => res.json()).then(data => data)
  console.log(playlistTracks)
  return <div>playlist</div>
}

export default PlaylistPage
