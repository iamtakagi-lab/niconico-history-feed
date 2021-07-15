import { WebhookClient } from 'discord.js'
import { Links } from './typings/struct'

export default (webhook: WebhookClient, links: Links) => {
  webhook.send(`${links.video_url}¥n${links.video_url}`)
}
