const status = process.env.NODE_ENV === 'development'

export default status ? 'http://127.0.0.1:3000' : '<domain>'
