import styled from 'styled-components'

export default function StylesModal({ name, changeStyle }) {
	return <TextWrapper onClick={() => changeStyle(name)}>{name}</TextWrapper>
}

const TextWrapper = styled.p`
	cursor: pointer;
	color: #fafafa;
	line-height: 1;
	padding: 0.5rem;
	text-align: center;
	text-transform: capitalize;
	background-color: #525252;
	border: 1px solid #404040;
	width: 11ch;
	font-size: 12px;
	transition: background-color 0.2s ease-in-out, box-shadow 0.5s ease-in-out;

	&:hover {
		background-color: #404040;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px 0px rgba(0, 0, 0, 0.06);
	}

	@media screen and (min-width: 600px) {
		font-size: 1rem;
	}
`
