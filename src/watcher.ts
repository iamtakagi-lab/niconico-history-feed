import fs from 'fs'
import { WebhookClient } from 'discord.js'
import env from './env'
import NiconicoClient from './niconico-client'
import compare from './comparator'
import links from './links'
import send from './send'

export default (client: NiconicoClient) => {
  const watch = async () => {
    const data = await client.getVideoViewHistory()

    //日付新しい順になってる
    const newHistoryItems = data.history

    //前データ読み込み
    const storedHistoryItems = JSON.parse(
      fs.readFileSync('./data/history.json', 'utf8')
    )

    let items = []

    if (storedHistoryItems.length <= 0) {
      items = newHistoryItems
    } else if (newHistoryItems != storedHistoryItems) {
      //新差分を抽出
      //古い順から消えていく
      const a = compare(storedHistoryItems, newHistoryItems)
      //消えた部分を付け足す
      const c = newHistoryItems.concat(storedHistoryItems.splice(0, -(a.length)))
      //再比較
      items = compare(storedHistoryItems, c)
    }

    if (items.length > 0) {
      env.DISCORD_WEBHOOK_URLS.split(',').map(async (url) => {
        const splitUrl = url.split('/')
        const webhook = new WebhookClient(splitUrl[5], splitUrl[6])

        //最新の動画履歴が最後に送信されるように
        items.reverse().map((item) => {
          links(item).then((links) => {
            send(webhook, links)
          })
        })
      })
    }

    //新データ書き込み
    fs.writeFileSync('./data/history.json', JSON.stringify(newHistoryItems))
  }

  setInterval(watch, env.WATCH_INTERVAL_SECONDS * 1000)
}
