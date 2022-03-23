import pg from 'pg'

export default new Promise((resolve, reject) => {
	const client = new pg.Client({
		port: 5555,
		host: '127.0.0.1',
		database: 'db',
		user: 'admin',
		password: 'root'
	})

	// Use nodejs 'global' to prevent the connection to the database each time the function is called
	if (global.client === undefined) {
		global.client = client.connect().then(() => {
			console.log('Connention with postgreSQL was successful')
		})
	}
	global.client
		.then(() => {
			client.query(`
      CREATE TABLE IF NOT EXISTS Post (
        id SERIAL,
        title CHAR(255) NOT NULL,
        content TEXT NOT NULL,
        creation TIMESTAMP DEFAULT NOW()
      )
    `)
			resolve(client)
		})
		.catch(error => {
			reject(error)
		})
})
