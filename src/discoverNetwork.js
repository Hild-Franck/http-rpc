const http = require('http')

const discoverNetwork = ({ ipList }) => new Promise((resolve, reject) => {
	let done = false
	let timeout = undefined
	console.log(`[INFO] Starting network discovery`)
	ipList.forEach((ip, idx) => {
		if (idx === ipList.length - 1) {
			timeout = setTimeout(() => reject(new Error('No service reached')), 5000)
		}
		
		const req = http.get(`http://${ip}`, res => {
			if (!done) {
				done = true
				if (timeout) clearTimeout(timeout)
				console.log(`[SUCCESS] Service reached at ${ip}`)
				resolve(res)
			}
		})

		req.on('error', ({ address, port }) => {
			console.log(`[WARNING] ${address}:${port} not reachable`)
		})
	})
})

module.exports = discoverNetwork