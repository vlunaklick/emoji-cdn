import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/:emoji', async (req, res) => {
	let { params, query } = req
	let { emoji } = params
	let { style } = query

	let regex = new RegExp(`<img.*(?:src|srcset)=\"(.*?${style}.*?)\">`, 'g')

	let codeHTML = await fetch(`https://emojipedia.org/${emoji}/`, {
		method: 'GET',
	})
		.then(data => data.text())
		.then(html => html)

	const found = codeHTML.match(regex)

	res.status(200).json(found)
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`)
})
