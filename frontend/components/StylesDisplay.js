import styled from 'styled-components'
import StylesModal from './StylesModal'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

export default function StylesDisplay({ changeStyle }) {
	const showStyles = stylesAvaible.map(style => {
		return <StylesModal name={style} key={style} changeStyle={changeStyle} />
	})

	return <StylesWrapper>{showStyles}</StylesWrapper>
}

const StylesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.2rem;
	max-width: 600px;
`

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
