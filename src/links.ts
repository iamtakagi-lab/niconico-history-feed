import { HistoryItem } from './typings/niconico'
import { Links } from './typings/struct'

export default (item: HistoryItem): Promise<Links> => {
  return new Promise((resolve) => {
    const video_id = item.video_id
    const video_url = `https://nico.ms/${video_id}`
    const nicothumb_url = `https://nicothumb2img.vercel.app/image/${video_id}#.png`
    const scrapbox_link = `[${nicothumb_url} ${video_url}]`
    resolve({ video_url, scrapbox_link })
  })
}
