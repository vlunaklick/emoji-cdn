import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { emojiController } from './controllers/emoji.controller.js'
import cacheInit from './middleware/cache.js'

const app = express()

let __dirname = path.resolve(path.dirname(''))

let dir = path.join(__dirname, 'public')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(dir))

app.use(cors())

app.get('/', cacheInit, (req, res) => {
	res.status(200).sendFile(path.join(dir, '/index.html'))
})

app.get('/:emoji', cacheInit, emojiController.serve)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`)
})
