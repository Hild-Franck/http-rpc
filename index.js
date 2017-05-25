const http = require('http')

const config = require('./config')
const discoverNetwork = require('./src/discoverNetwork')
const setNetworkStatus = require('./src/setNetworkStatus')

const server = http.createServer((req, res) => {
	res.end()
})

server.listen(config.ip)

discoverNetwork(config)
	.then(setNetworkStatus)
	.catch(err => console.log(err))