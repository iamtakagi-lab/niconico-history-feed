import { NiconicoCredential, VideoViewHistory } from './typings/niconico'
import request from 'request'

export default class NiconicoClient {
  private credential: NiconicoCredential
  private cookie: string | null

  constructor(cookie: string) {
    this.cookie = cookie
  }

  static async login({
    email,
    password,
  }: NiconicoCredential): Promise<NiconicoClient> {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: 'https://secure.nicovideo.jp/secure/login',
          form: {
            mail_tel: email,
            password,
          },
        },
        (err, res) => {
          if (err) reject(err)

          const cookies = res.headers['set-cookie']
          const cookie =
            cookies.find(
              (cookie) => cookie.indexOf('user_session=user_session') === 0
            ) || ''
          const userSession = cookie.slice(0, cookie.indexOf(';') + 1)

          if (!userSession) reject('Invalid user')

          const client = new NiconicoClient(userSession)
          client.credential = { email, password }
          resolve(client)
        }
      )
    })
  }

  async getVideoViewHistory(): Promise<VideoViewHistory> {
    return new Promise((resolve, reject) => {
      request(
        {
          url: 'https://nicovideo.jp/api/videoviewhistory/list',
          headers: {
            Cookie: this.cookie,
          },
        },
        (err, res, body) => {
          resolve(JSON.parse(body))
        }
      )
    })
  }
}
