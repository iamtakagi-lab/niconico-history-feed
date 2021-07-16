export default {
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  NICONICO_EMAIL: process.env.NICONICO_EMAIL
    ? process.env.NICONICO_EMAIL
    : null,
  NICONICO_PASSWORD: process.env.NICONICO_PASSWORD
    ? process.env.NICONICO_PASSWORD
    : null,
  DISCORD_WEBHOOK_URLS: process.env.DISCORD_WEBHOOK_URLS
    ? process.env.DISCORD_WEBHOOK_URLS
    : null,
  WATCH_INTERVAL_SECONDS: process.env.WATCH_INTERVAL_SECONDS
    ? Number(process.env.WATCH_INTERVAL_SECONDS)
    : Number(60),
  MESSAGE_FORMAT: process.env.MESSAGE_FORMAT
    ? process.env.MESSAGE_FORMAT
    : '%video_url% %scrapbox_link%'
}
