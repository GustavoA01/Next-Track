export interface SpotifyUserProfile {
  id: string
  display_name: string
  email: string
  images: Image[]
  country: string
  external_urls: { spotify: string }
  followers: { href: string; total: number }
  href: string
  product: string
  type: string
  uri: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: Image[]
  public: boolean
  collaborative: boolean
  external_urls: { spotify: string }
  href: string
  owner: string
  snapshot_id: string
  type: string
  uri: string
  tracks: {
    href: string
    total: number
  }
}

export interface Image {
  url: string
  height: number
  width: number
}
