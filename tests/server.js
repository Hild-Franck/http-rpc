const http = require('http')

const server = http.createServer((req, res) => {
	console.log('Http request received')
	res.write(JSON.stringify({
		chicken: 'rosted'
	}))
	res.end()
})

server.listen(8080)
console.log('Starting test server at localhost:8080')
