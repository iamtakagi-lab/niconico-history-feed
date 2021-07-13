import NiconicoClient from './niconico-client'
import env from './env'
import { NiconicoCredential } from './typings/niconico'
import watcher from './watcher'

const credential: NiconicoCredential = {
  email: env.NICONICO_EMAIL,
  password: env.NICONICO_PASSWORD,
}

;(async () => {
  const client = await NiconicoClient.login(credential)
  watcher(client)
})()
