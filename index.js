const http = require('http')

const config = require('./config')
const discoverNetwork = require('./src/discoverNetwork')

const server = http.createServer((req, res) => {
	res.end()
})

server.listen(config.ip)

discoverNetwork(config).then(res => {
	console.log('Data reached !')
	console.log(res)
})