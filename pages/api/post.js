import db from '~/library/db'

export default async function handler(request, response) {
	switch (request.method) {
		case 'POST':
			const {title, content} = request.body
			const client = await db
			const post = await client.query(`
				INSERT INTO Post (
					title,
					content
				) VALUES (
					'${title}',
					'${content}'
				);
				SELECT id FROM Post WHERE (
					title = '${title}' AND content = '${content}'
				)
			`)
			response.status(304).redirect(`/post/${post[1].rows[0].id}`)
			break
		default:
			response.status(405).json({
				error: ['Method Not Allowed']
			})
			break
	}
}
