import styled from 'styled-components'
import {useRouter} from 'next/router'
import Layout from '~/components/Layout'
import Input from '~/components/Input'
import Textarea from '~/components/Textarea'
import Button from '~/components/Button'
import Footer from '~/components/Footer'

const Wrapper = styled(Layout)`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	${Textarea} {
		height: 250px;
	}
	${Input}, ${Textarea} {
		width: 100%;
		margin: 0 0 15px 0;
	}
`

export default function Home() {
	const currentYear = new Date().getFullYear()

	const router = useRouter()
	function submit(event) {
		event.preventDefault()
		const data = {
			title: event.target.title.value,
			content: event.target.content.value
		}
		fetch('/api/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(response => {
			if (response.redirected) {
				router.push(response.url)
			}
		})
	}

	return (
		<Wrapper>
			<h1>Write Your post</h1>
			<Form onSubmit={submit}>
				<Input placeholder="add title" name="title" />
				<Textarea placeholder="add content" name="content"></Textarea>
				<Button>SEND</Button>
			</Form>
			<Footer>
				<p>
					© copyright {currentYear}.{' '}
					<a href="https://github.com/ahmadkhaefi">see my github</a>
				</p>
			</Footer>
		</Wrapper>
	)
}
