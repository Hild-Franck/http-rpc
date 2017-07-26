const http = require('http')

const server = http.createServer((req, res) => {
	console.log('Http request received')
	res.write(JSON.stringify([{
		hash: '42',
		name: 'myCoolService',
		status: 'up'
	}]))
	res.end()
})

server.listen(8080)
console.log('Starting test server at localhost:8080')
