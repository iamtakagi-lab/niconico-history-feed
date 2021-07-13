import fs from 'fs'
import { WebhookClient } from 'discord.js'
import env from './env'
import NiconicoClient from './niconico-client'
import { compare } from './object-comparator'

export default (client: NiconicoClient) => {
  const watch = async () => {
    const newHistoryItems = await (await client.getVideoViewHistory()).history

    //前データ読み込み
    const storedHistoryItems = JSON.parse(
      fs.readFileSync('./data/history.json', 'utf8')
    )

    if (
      storedHistoryItems.length <= 0 ||
      newHistoryItems != storedHistoryItems
    ) {
    　//新差分を抽出
      const c = compare(storedHistoryItems, newHistoryItems)

      env.DISCORD_WEBHOOK_URLS.split(',').map(async (url) => {
        const splitUrl = url.split('/')
        const webhook = new WebhookClient(splitUrl[5], splitUrl[6])
        c.map((item) => {
          webhook.send('https://www.nicovideo.jp/watch/' + item.video_id)
        })
      })

      //新データ書き込み
      fs.writeFileSync('./data/history.json', JSON.stringify(newHistoryItems))
    }
  }

  setInterval(watch, env.WATCH_INTERVAL_SECONDS * 1000)
}
