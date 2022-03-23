import Link from 'next/link'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import Layout from '~/components/Layout'
import Button from '~/components/Button'
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

const Tools = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	background-color: #6f9400;
	position: absolute;
	bottom: 35px;
	left: 50%;
	transform: translate(-50%, 0);
`

export default function Post({post}) {
	const router = useRouter()
	function submit(event) {
		event.preventDefault()
		fetch(`/api/post?id=${post.id}`, {
			method: 'DELETE'
		}).then(response => {
			if (response.redirected) {
				router.push(response.url)
			}
		})
	}

	return (
		<Wrapper>
			<h1>{post.title}</h1>
			<span>Created at {post.creation}</span>
			<p>{post.content}</p>
			<Tools>
				<Link href="/" passHref>
					<a>
						<Button>new</Button>
					</a>
				</Link>
				<Link href={`/post/update/${post.id}`} passHref>
					<a>
						<Button>update</Button>
					</a>
				</Link>
				<form onSubmit={submit}>
					<Button>delete</Button>
				</form>
			</Tools>
		</Wrapper>
	)
}
