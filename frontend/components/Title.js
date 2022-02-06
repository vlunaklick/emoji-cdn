import styled from 'styled-components'

export default function Title() {
	return (
		<TitleWrapper>
			<h1>🧸 Emoji picker</h1>
			<a href='https://cdnemoji.herokuapp.com/' target='_blank'>
				Test our CDN API
			</a>
		</TitleWrapper>
	)
}

const TitleWrapper = styled.header`
	min-width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: padding 0.5s ease-in-out;

	h1,
	a {
		color: #fafafa;
		line-height: 1;
		transition: font-size 0.5s ease-in-out;
	}

	h1 {
		font-size: 1.5rem;
	}

	a {
		font-size: 0.8rem;
	}

	a {
		text-decoration: underline;
		transition: color 0.5s ease-in-out;
	}
	a:hover {
		color: #e5e5e5;
	}

	@media screen and (min-width: 600px) {
		h1 {
			font-size: 2rem;
		}

		a {
			font-size: 1rem;
		}
	}
`
