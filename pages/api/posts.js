import db from '~/library/db'

export default async function handler(request, response) {
	switch (request.method) {
		case 'GET': {
			const client = await db
			const posts = await client.query(`
				SELECT * FROM Post
			`)
			response.status(200).json({
				posts: posts.rows ?? null
			})
			break
		}
		default:
			response.status(405).json({
				error: ['Method Not Allowed']
			})
			break
	}
}
