import pg from 'pg'

// Use nodejs 'global' to prevent the connection to the database each time the function is called

if (global.client === undefined) {
	const client = new pg.Client({
		port: 5555,
		host: '127.0.0.1',
		database: 'db',
		user: 'admin',
		password: 'root'
	})
	client.connect().then(() => {
		console.log('Connection with postgreSQL was successful')
		client.query(`
			CREATE TABLE IF NOT EXISTS Post (
				id SERIAL,
				title CHAR(255) NOT NULL,
				content TEXT NOT NULL,
				creation TIMESTAMP DEFAULT NOW()
			)
    `)
	})
	global.client = client
}

export default global.client