const http = require('http')

const discoverNetwork = ({ ipList }) => new Promise((resolve, reject) => {
	let done = false
	let timeout = undefined

	ipList.forEach((ip, idx) => {
		if (idx === ipList.length - 1) {
			timeout = setTimeout(() => reject(new Error('No service reached')), 5000)
		}
		const req = http.get(`http://${ip}/network`, res => {
			if (!done) {
				done = true
				if (timeout) clearTimeout(timeout)
				resolve(res)
			}

		})
		req.on('error', ({ address, port }) => {
			console.log(`${address}:${port} not reachable`)
		})
	})
})

module.exports = discoverNetwork