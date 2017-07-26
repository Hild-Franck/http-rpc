const database = require('./database')

const setNetworkStatus = res => new Promise((resolve, reject) => {
	res.setEncoding('utf8')
	let rawData = ''
	res.on('data', chunk => {
		rawData = rawData + chunk
	})
	res.on('end', () => {
		const parsedData = JSON.parse(rawData)
		database.updateNetwork(parsedData)
		resolve(database)
	})
})

module.exports = setNetworkStatus