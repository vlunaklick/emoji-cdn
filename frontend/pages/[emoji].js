import axios from 'axios'
import Image from 'next/image'
import styled from 'styled-components'

export default function Emoji(props) {
	return (
		<EmojiWrapper>
			<img src={`http://localhost:3005/public/emoji.png`} alt='emoji-img' />
		</EmojiWrapper>
	)
}

const EmojiWrapper = styled.main`
	min-height: 100vh;
	background-color: #18181b;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		-webkit-user-select: none;
		margin: auto;
		background-color: hsl(0, 0%, 90%);
		transition: background-color 300ms;
		width: 160px;
		height: 160px;
		box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
			0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
	}
`

export async function getServerSideProps(context) {
	const { query, res } = context
	let { style, emoji } = query

	if (style === undefined) {
		style = 'apple'
	} else if (style === 'facebook') {
		style = 'facebook/230'
	} else if (style === 'messenger') {
		style = 'facebook/65'
	}

	let result = await axios(
		`http://localhost:3005/emojis/${encodeURIComponent(emoji)}?style=${style}`
	)

	if (result.status === 200) {
		return { props: { image: await result.data } }
	}

	if (res) {
		res.writeHead(301, { Location: '/' }).end()
	}
}

const stylesAvaible = [
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
