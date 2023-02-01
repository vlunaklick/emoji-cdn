import axios from 'axios'
import pkg from 'xhr2'
const { XMLHttpRequest } = pkg

class EmojiController {
	serve = async (req, res) => {
		let { params, query } = req
		let { emoji } = params
		let { style } = query

		let emojiREGEX =
			/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

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

const stylesAvaibles = [
	'apple',
	'google',
	'microsoft',
	'samsung',
	'whatsapp',
	'twitter',
	'facebook',
	'messenger',
	'joypixels',
	'openmoji',
	'emojidex',
	'lg',
	'htc',
	'mozilla',
]
