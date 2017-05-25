const http = require('http')

const server = http.createServer((req, res) => {
	res.write(JSON.stringify({
		chicken: 'rosted'
	}))
	res.end()
})

server.listen(8080)