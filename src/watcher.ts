import fs from 'fs'
import { WebhookClient } from 'discord.js'
import env from './env'
import NiconicoClient from './niconico-client'
import compare from './comparator'
import sort from './sort'

export default (client: NiconicoClient) => {
  const watch = async () => {
    const data = await client.getVideoViewHistory()
    const newHistoryItems = sort(data.history)

    //前データ読み込み
    const storedHistoryItems = JSON.parse(
      fs.readFileSync('./data/history.json', 'utf8')
    )

    let items = []

    if (storedHistoryItems.length <= 0) {
      items = newHistoryItems
    }
    else if (newHistoryItems != storedHistoryItems) {
      //新差分を抽出
      //最も古い履歴から順に削除されるため、storedHistoryItemsの先頭を無視
      items = compare(storedHistoryItems, newHistoryItems)
    }

    if (items.length > 0) {
      env.DISCORD_WEBHOOK_URLS.split(',').map(async (url) => {
        const splitUrl = url.split('/')
        const webhook = new WebhookClient(splitUrl[5], splitUrl[6])
        items.map((item) => {
          webhook.send(`https://nicovideo.jp/watch/${item.video_id}`)
        })
      })
    }

    //新データ書き込み
    fs.writeFileSync('./data/history.json', JSON.stringify(newHistoryItems))
  }

  setInterval(watch, env.WATCH_INTERVAL_SECONDS * 1000)
}
