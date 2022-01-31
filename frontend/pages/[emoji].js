import { useRouter } from 'next/router'

export default function Emoji(props) {
	return <></>
}

export function getServerSideProps(context) {
	const { query, res } = context
	let { style, emoji } = query

	if (style === undefined) {
		style = 'apple'
	} else if (style === 'facebook') {
		style = 'facebook/230'
	} else if (style === 'messenger') {
		style = 'facebook/65'
	}

	const result = fetch(
		`http://localhost:3005/${encodeURIComponent(emoji)}?style=${style}`
	).then(data => console.log(data))

	return { props: query }
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
