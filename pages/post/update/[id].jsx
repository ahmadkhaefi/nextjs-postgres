import styled from 'styled-components'
import {useRouter} from 'next/router'
import Layout from '@components/Layout'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import Tools from '@components/Tools'
import Button from '@components/Button'
import domain from '@library/domain'

export async function getServerSideProps(context) {
	const {id} = context.params
	const response = await fetch(`${domain}/api/post?id=${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	if (data.post === null) {
		return {
			notFound: true
		}
	} else {
		return {
			props: {
				post: data.post
			}
		}
	}
}

const Wrapper = styled(Layout)`
	> h1 {
		margin: 0 0 15px 0;
	}
	> span {
		margin: 0 0 35px 0;
		color: #444444;
	}
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

export default function Post({post}) {
	const router = useRouter()

	function submit(event) {
		event.preventDefault()
		const data = {
			title: event.target.title.value,
			content: event.target.content.value
		}
		fetch(`/api/post?id=${post.id}`, {
			method: 'PUT',
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
			<h1>edit `{post.title}`</h1>
			<Form onSubmit={submit}>
				<Input defaultValue={post.title} name="title" />
				<Textarea defaultValue={post.content} name="content"></Textarea>
				<Button>UPDATE</Button>
			</Form>
			<Tools id={post.id} />
		</Wrapper>
	)
}
