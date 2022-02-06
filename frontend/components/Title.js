import styled from 'styled-components'

export default function Title() {
	return (
		<TitleWrapper>
			<h1>Emoji picker</h1>
			<a href='https://cdnemoji.herokuapp.com/' target='_blank'>
				Test our CDN API
			</a>
		</TitleWrapper>
	)
}

const TitleWrapper = styled.header`
	min-width: 100%;
	padding: 0 0 8px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: padding 0.5s ease-in-out;

	h1,
	a {
		color: #fafafa;
		line-height: 1;
	}

	a {
		text-decoration: underline;
	}

	@media screen and (min-width: 1200px) {
		padding: 10px;
	}
`
