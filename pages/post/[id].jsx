import Link from 'next/link'
import styled from 'styled-components'
import Layout from '~/components/Layout'
import Button from '~/components/Button'
import Tools from '~/components/Tools'
import domain from '~/library/domain'

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

export default function Post({post}) {
	return (
		<Wrapper>
			<h1>{post.title}</h1>
			<span>Created at {post.creation}</span>
			<p>{post.content}</p>
			<Tools id={post.id} />
		</Wrapper>
	)
}
