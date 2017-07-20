const level = require('level')
const concat = require('concat-stream')

const database = {
	store: undefined,
	clear: () =>
		database.getNetwork()
			.then(network => {
				console.log('network: ', network)
				network.reduce((batch, service) => {
					return batch.del(service.key)
				}, database.store.batch()).write()
			}),
	init: dbName => {
		if (database.store) {
			console.log('[WARNING] Store already open')
			return database
		}
		console.log('Opening store in database')
		database.store = level(`../${dbName}`, { valueEncoding: 'json' })
		return database
	},
	updateNetwork: nodes => new Promise((resolve, reject) => {
		database.store.batch(nodes, err => {
			if (err) return reject(err)
			console.log('[SUCCESS] Network status have been updated')
			resolve(database)
		})
	}),
	pipeNetwork: res => database.store.createReadStream().pipe(res),
	getNetwork: () => new Promise((resolve, reject) =>
		database.store.createReadStream().pipe(concat(resolve))),
	getServiceStatus: serviceName => new Promise((resolve, reject) => {
		database.store.get(serviceName, (err, value) => {
			if (err) return reject(err)
				console.log(`[SUCCESS] ${serviceName} have been get`)
				resolve(value)
		})
	})
}

module.exports = database