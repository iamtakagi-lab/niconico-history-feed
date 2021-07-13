export type NiconicoCredential = {
  email: string
  password: string
}

export type VideoViewHistory = {
  token: string
  history: Array<HistoryItem>
  status: string
}

export type HistoryItem = {
  item_id: string
  video_id: string
  delete: number
  thumbnail_url: string
  title: string
  length: string
  watch_date: number
  watch_count: number
  device: number
  playback_position: number
}
