import {useEffect, useState} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Spinner from '~/components/Spinner'
import Layout from '~/components/Layout'

const Wrapper = styled(Layout)`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Card = styled.div`
	border-radius: 5px;
	border: 1px solid #eeeeee;
	padding: 25px;
	margin: 0 0 15px 0;
	width: 100%;
`

export default function Posts() {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// This setTimeout is just to show the spinner clearly
		setTimeout(() => {
			fetch('/api/posts', {
				method: 'GET'
			})
				.then(response => {
					response.json().then(data => {
						setPosts(data.posts)
						setLoading(false)
					})
				})
				.catch(error => {
					setLoading(false)
				})
		}, 1000)
	})
	return (
		<Wrapper>
			<h1>All posts</h1>
			{loading ? (
				<Spinner />
			) : posts.length === 0 ? (
				<p>
					There are no posts yet{' '}
					<Link href="/" passHref>
						<a>create one</a>
					</Link>
				</p>
			) : (
				posts.map(post => (
					<Card key={post.id}>
						<Link href={`/post/${post.id}`} passHref>
							<a>
								<h1>{post.title}</h1>
							</a>
						</Link>
						<p>{post.content.substr(0, 255)}</p>
					</Card>
				))
			)}
		</Wrapper>
	)
}
