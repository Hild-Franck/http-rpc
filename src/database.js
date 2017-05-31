const level = require('level')

const database = {
	store: {},
	init: () => {
		if (database.store.isOpen && database.store.isOpen()) {
			console.log('[WARNING] Store already open')
			return database
		}
		console.log('Opening store in database')
		database.store = level('../networkDB', { valueEncoding: 'jsonnpm' })
		return database
	},
	updateNetwork: nodes => new Promise((resolve, reject) => {
		database.store.batch(nodes, err => {
			if (err) return reject(err)
			console.log('[SUCCESS] Network status have been updated')
			resolve(nodes)
		})
	}),
	getNetwork: res => database.store.createReadStream().pipe(res),
	getServiceStatus: serviceName => new Promise((resolve, reject) => {
		database.store.get(serviceName, (err, value) => {
			if (err) return reject(err)
				console.log(`[SUCCESS] ${serviceName} have been get`)
				resolve(value)
		})
	})
}

module.exports = database