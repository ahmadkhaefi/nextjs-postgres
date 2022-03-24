import db from '@library/db'

export default async function handler(request, response) {
	const client = await db

	switch (request.method) {
		case 'GET': {
			const {id} = request.query
			const post = await client.query(`
				SELECT * FROM Post WHERE (
					id = '${id}'
				)
			`)
			response.status(200).json({
				post: post.rows[0] ?? null
			})
			break
		}
		case 'POST': {
			const {title, content} = request.body
			const post = await client.query(`
				INSERT INTO Post (
					title,
					content
				) VALUES (
					'${title}',
					'${content}'
				) RETURNING id
			`)
			response.status(304).redirect(`/post/${post.rows[0].id}`)
			break
		}
		case 'PUT': {
			const {title, content} = request.body
			const {id} = request.query
			const post = await client.query(`
				UPDATE Post
				SET
					title = '${title}',
					content = '${content}'
			 	WHERE (
					id = '${id}'
				);
				SELECT id FROM Post WHERE (
					title = '${title}' AND content = '${content}'
				)
			`)
			response.status(304).redirect(`/post/${post[1].rows[0].id}`)
			break
		}
		case 'DELETE': {
			const {id} = request.query
			await client.query(`
				DELETE FROM Post WHERE id = '${id}'
			`)
			response.status(304).redirect('/posts')
			break
		}
		default:
			response.status(405).json({
				error: ['Method Not Allowed']
			})
			break
	}
}
