import {useRouter} from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '~/components/Button'

function Tools(properties) {
	const router = useRouter()

	function submit(event) {
		event.preventDefault()
		fetch(`/api/post?id=${properties.id}`, {
			method: 'DELETE'
		}).then(response => {
			if (response.redirected) {
				router.push(response.url)
			}
		})
	}

	return (
		<div className={properties.className}>
			<Link href="/" passHref>
				<a>
					<Button>new</Button>
				</a>
			</Link>
			<Link href="/posts" passHref>
				<a>
					<Button>all</Button>
				</a>
			</Link>
			<Link href={`/post/update/${properties.id}`} passHref>
				<a>
					<Button>update</Button>
				</a>
			</Link>
			<form onSubmit={submit}>
				<Button>delete</Button>
			</form>
		</div>
	)
}

export default styled(Tools)`
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	background-color: #6f9400;
	position: absolute;
	bottom: 35px;
	left: 50%;
	transform: translate(-50%, 0);
`
