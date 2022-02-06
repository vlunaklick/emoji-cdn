import styled from 'styled-components'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import StylesDisplay from './StylesDisplay'
import { useState } from 'react'
import Image from 'next/image'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EmojiDisplay() {
	const [style, setStyle] = useState('apple')
	const [emoji, setEmoji] = useState('')
	const [src, setSrc] = useState('/imganon.jpg')

	const changeStyle = newStyle => {
		setStyle(newStyle)
	}

	const changeImg = async e => {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
		const response = await fetch(
			`https://cdnemoji.herokuapp.com/${emoji}?style=${style}`
		)
		if (response.status === 404) {
			toast.error(`The emoji ${emoji} doesn't have the style "${style}"`, {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			})
			setSrc('/imganon.jpg')
		} else {
			const imageBlob = await response.blob()
			const reader = new FileReader()
			reader.readAsDataURL(imageBlob)
			reader.onloadend = () => {
				const base64data = reader.result
				setSrc(base64data)
			}
		}
	}

	return (
		<DisplayWrapper>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className='top-part'>
				<div className='img-lay'>
					<Image
						src={src}
						layout='fill'
						alt='Picture of the emoji'
						objectFit='contain'
						priority
					/>
				</div>
				<Picker
					set='apple'
					showSkinTones={false}
					theme={'dark'}
					showPreview={false}
					onClick={(emoji, event) => {
						event.preventDefault()
						setEmoji(emoji.native)
					}}
				/>
			</div>
			<div className='bottom-part'>
				<StylesDisplay changeStyle={changeStyle} />
				<button className='btn-submit' onClick={changeImg}>
					Submit
					<BsFillArrowUpRightCircleFill />
				</button>
			</div>
		</DisplayWrapper>
	)
}

const DisplayWrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	background-color: #262626;
	padding: 0.3rem;
	margin: 0 auto;
	border-radius: 5px;
	transition: padding 0.5s ease-in-out;
	box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1) , 0px 2px 4px -1px rgba(0,0,0,0.06) ;

	.img-lay {
		width: 120px;
		height: 120px;
		position: relative;--
	}

	.top-part {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.bottom-part {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: center;
	}

	.btn-submit {
		padding: 0.5rem;
		outline: none;
		cursor: pointer;
		line-height: 1;
		border: none;
		background-color: #3f6212;
		color: #fefefe;
		display: flex;
		gap: 0.5rem;
		width: 22.25ch;
		border-bottom: 2px solid #4d7c0f;
		font-size: 12px;
		align-items: center;
		transition: background-color 0.5s ease-in-out;
		justify-content: center;
	}

	.btn-submit:hover {
		background-color: #365314;
	}

	@media screen and (min-width: 600px) {
		width: 600px;
		padding: 0.5rem;

		.btn-submit {
			font-size: 1rem;
		}
		.top-part {
			flex-direction: row;
			gap: 2rem;
		}
	}
`

let regexURL =
	/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
