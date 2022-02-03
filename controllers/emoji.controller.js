import axios from 'axios'
import pkg from 'xhr2'
const { XMLHttpRequest } = pkg
import fs from 'fs'
import path from 'node:path'

let __dirname = path.resolve(path.dirname(''))

let dir = path.join(__dirname, 'public')

class EmojiController {
	serve = async (req, res) => {
		let { params, query } = req
		let { emoji } = params
		let { style } = query

		if (style === undefined) {
			style = 'apple'
		}

		let regexIMG = new RegExp(`<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`, 'g')

		axios.get(`https://emojipedia.org/${encodeURI(emoji)}`).then(({ data }) => {
			if (data.match(regexIMG) === null) {
				res.status(404).send('Not avaible style of the icon')
			} else {
				let value = data.match(regexIMG)[0].replace('2x', '').trim()
				let url = value.match(
					/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
				)
				fetchBlob(url[0], function (blob) {
					let str = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))

					console.log('entre')

					res.send('<img src="' + 'data:image/png;base64,' + str + '"/>')
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
