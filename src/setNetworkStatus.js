const setNetworkStatus = res => new Promise((resolve, reject) => {
	res.setEncoding('utf8')
	let rawData = ''
	res.on('data', chunk => {
		console.log(chunk)
		rawData = rawData + chunk
	})
	res.on('end', () => {
		const parsedData = JSON.parse(rawData)
		resolve(parsedData)
	})
})

module.exports = setNetworkStatus