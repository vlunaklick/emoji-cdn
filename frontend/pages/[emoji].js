import { useRouter } from 'next/router'

export default function Emoji(props) {
	return <></>
}

export function getServerSideProps(context) {
	const { query, res } = context
	let { style, emoji } = query

	if (style === undefined) {
		style = 'apple'
	}

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
