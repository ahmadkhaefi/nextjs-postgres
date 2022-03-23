import styled from 'styled-components'
import Layout from '../componets/Layout'
import Input from '../componets/Input'
import Textarea from '../componets/Textarea'
import Button from '../componets/Button'

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
	return (
		<Wrapper>
			<h1>Write Your post</h1>
			<Form>
				<Input placeholder="add title" name="title" />
				<Textarea placeholder="add content"></Textarea>
				<Button>SEND</Button>
			</Form>
		</Wrapper>
	)
}
