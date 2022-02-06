import Head from 'next/head'
import styled from 'styled-components'
import Title from '../components/Title'
import EmojiDisplay from '../components/EmojiDisplay'

export default function Home() {
	return (
		<>
			<Head>
				<title>Emoji picker</title>
				<meta name='description' content='Emoji picker with his own CDN' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainWrapper>
				<ContentWrapper>
					<Title />
					<EmojiDisplay />
				</ContentWrapper>
			</MainWrapper>
		</>
	)
}

const MainWrapper = styled.main`
	width: 100%;
	min-height: 100vh;
	background-color: #171717;
`
const ContentWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 0.8rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media screen and (min-width: 1200px) {
		width: 1200px;
		gap: 1rem;
	}
`
