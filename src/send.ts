import { WebhookClient } from 'discord.js'
import env from './env'
import { Links } from './typings/struct'

export default (webhook: WebhookClient, links: Links) => {
  const message = env.MESSAGE_FORMAT
    .replace('%video_url%', links.video_url)
    .replace('%scrapbox_link%', links.scrapbox_link)
  webhook.send(message)
}
