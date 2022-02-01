/* import express from 'express'
import cors from 'cors'
import axios from 'axios'
import pkg from 'xhr2'
const { XMLHttpRequest } = pkg
import fs from 'fs'
import path from 'node:path'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

let __dirname = path.resolve(path.dirname(''))

app.get('/emojis/:emoji', (req, res) => {
	let { params, query } = req
	let { emoji } = params
	let { style } = query

	let regex = new RegExp(`<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`, 'g')

	axios.get(`https://emojipedia.org/${encodeURI(emoji)}`).then(({ data }) => {
		let value = data.match(regex)[0].replace('2x', '').trim()
		let url = value.match(
			/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
		)

		fetchBlob(url[0], function (blob) {
			// Array buffer to Base64:
			let str = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))

			console.log(str)

			fs.writeFile('emoji.png', `${str}`, 'base64', function (err) {
				console.log(err)
			})

			res.setHeader('content-type', 'image/png').status(200).send(str)
		})
	})
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
} */

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

app.get('/emojis/:emoji', (req, res) => {
	let { params, query } = req
	let { emoji } = params
	let { style } = query

	let regex = new RegExp(`<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`, 'g')

	axios.get(`https://emojipedia.org/${encodeURI(emoji)}`).then(({ data }) => {
		let value = data.match(regex)[0].replace('2x', '').trim()
		let url = value.match(
			/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
		)

		fetchBlob(url[0], function (blob) {
			let str = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))

			fs.writeFile('public/emoji.png', `${str}`, 'base64', function (err) {
				console.log(err)
			})

			res.sendFile(path.join(dir, '/emoji.png'))
		})
	})
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
