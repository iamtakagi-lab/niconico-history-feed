import { WebhookClient } from 'discord.js'
import env from './env'
import { Links } from './typings/struct'

export default (webhook: WebhookClient, links: Links) => {
  webhook.send(
    `${links.video_url}${
      env.SEND_SCRAPBOX_LINK ? '\n' + links.scrapbox_link : ''
    }`
  )
}
