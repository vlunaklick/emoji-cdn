import {
  isValidEmoji,
  isValidStyle,
  scrapeUrl,
  getImageSrc,
  fetchBlob,
} from '../utils/index.js'

class EmojiController {
  serve = async (req, res) => {
    let { params, query } = req
    let { emoji } = params
    let { style = 'apple' } = query

    if (!isValidEmoji(emoji)) {
      res.status(404).send({
        error: 'Emoji not found',
      })
      return
    }

    if (!isValidStyle(style)) {
      res.status(404).send({
        error: 'Style not available',
      })
      return
    }

    const $ = await scrapeUrl(`https://emojipedia.org/${emoji}`)

    const src = getImageSrc($, style)

    fetchBlob(src, blob => {
      res.set('Content-Type', 'image/png')
      res.end(Buffer.from(blob, 'base64'))
    })
  }
}

const controller = new EmojiController()

export { controller as emojiController }
