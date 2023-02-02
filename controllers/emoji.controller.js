import axios from 'axios'
import pkg from 'xhr2'
const { XMLHttpRequest } = pkg

class EmojiController {
  serve = async (req, res) => {
    let { params, query } = req
    let { emoji } = params
    let { style } = query

    if (emoji.match(emojiREGEX) === null) {
      res.status(404).send('That icon isn&#39;t avaible.')
      return
    }

    if (style === undefined) {
      style = 'apple'
    }

    if (!stylesAvaibles.includes(style.toLowerCase())) {
      res.status(404).send('That style doesn&#39;t exist.')
      return
    }

    let regexHTML = new RegExp(
      `<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`,
      'g'
    )

    let regexURL =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim

    axios.get(`https://emojipedia.org/${encodeURI(emoji)}`).then(({ data }) => {
      if (data.match(regexHTML) === null) {
        res.status(404).send('Not avaible style of the icon')
        return
      } else {
        let imgHTML = data.match(regexHTML)[0].replace('2x', '').trim()
        let imgSRC = imgHTML.match(regexURL)

        fetchBlob(imgSRC[1], function (blob) {
          let src = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))

          let imgFinal = Buffer.from(src, 'base64')

          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imgFinal.length,
          })
          res.end(imgFinal)
        })
      }
    })
  }
}

const controller = new EmojiController()
export { controller as emojiController }

function fetchBlob(uri, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', uri, true)
  xhr.responseType = 'arraybuffer'

  xhr.onload = function (e) {
    if (this.status == 200) {
      var blob = this.response
      if (callback) {
        callback(blob)
      }
    }
  }
  xhr.send()
}
