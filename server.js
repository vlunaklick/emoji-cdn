import express from 'express'
import cors from 'cors'
import axios from 'axios'
import pkg from 'xhr2'
const { XMLHttpRequest } = pkg
import fs from 'fs'
import path from 'node:path'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

let __dirname = path.resolve(path.dirname(''))

let dir = path.join(__dirname, 'public')

app.use('/public', express.static(dir))

app.use(cors())

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(dir, '/index.html'))
})

app.get('/:emoji', async (req, res) => {
	let { params, query } = req
	let { emoji } = params
	let { style } = query

	if (style === undefined) {
		style = 'apple'
	}

	let regexIMG = new RegExp(`<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`, 'g')

	if (fs.existsSync(path.join(dir, `/${decodeURI(emoji)}style${style}.png`))) {
		res.sendFile(path.join(dir, `/${decodeURI(emoji)}style${style}.png`))
	} else {
		axios.get(`https://emojipedia.org/${encodeURI(emoji)}`).then(({ data }) => {
			if (data.match(regexIMG) === null) {
				res.status(200).send('Not avaible style of the icon')
			} else {
				let value = data.match(regexIMG)[0].replace('2x', '').trim()
				let url = value.match(
					/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
				)

				fetchBlob(url[0], function (blob) {
					let str = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))

					fs.writeFile(
						`public/${decodeURI(emoji)}style${style}.png`,
						`${str}`,
						'base64',
						function (err) {}
					)

					res.redirect(`/${decodeURI(emoji)}?style=${style}`)
					res.sendFile(path.join(dir, `/${decodeURI(emoji)}style${style}.png`))
				})
			}
		})
	}
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`)
})

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
