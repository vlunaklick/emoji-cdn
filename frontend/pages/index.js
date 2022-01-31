import Head from 'next/head'
import Modal from '../components/modal'

export default function Home() {
	return (
		<>
			<Head>
				<title>Emoji's CDN</title>
				<meta name='description' content='CDN of emojis' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Modal />
		</>
	)
}
