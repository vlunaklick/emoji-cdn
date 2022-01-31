import styled from 'styled-components'

export default function Modal() {
	return (
		<WrapperModal>
			<div className='container'>
				<div className='title-container'>
					<h3>Emoji's CDN</h3>
					<h1>Emoji to PNG, fast an easy.</h1>
				</div>
				<p>
					Add an emoji to the URL. For example:{' '}
					<a href='http://localhost:3000/🐭'>localhost:3000/🐭</a>.
				</p>
				<p>
					To choose your prefered plataform to get the emoji from, add a{' '}
					<span>?style=</span> query parameter ()
				</p>
				<p>
					If you want to use an emoji across plataforms, and/or for
					user-generated content, you will find this API very useful.
				</p>
				<p>
					This web page is based on the project from:{' '}
					<a href='https://github.com/benborgers'>Ben Borgers</a>
				</p>
			</div>
		</WrapperModal>
	)
}

const WrapperModal = styled.main`
	background-color: #e2e8f0;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
		0px 1px 2px 0px rgba(0, 0, 0, 0.06);

	.container {
		max-width: 500px;
		background-color: #fff;
		border-radius: 5px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h3 {
		color: #475569;
	}

	p {
		font-size: 1.125rem;
		color: #475569;
	}

	a {
		text-decoration: underline;
		cursor: pointer;
		color: #475569;
	}
	span {
		font-weight: 600;
	}
`
