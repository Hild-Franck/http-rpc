const loki = require('lokijs')
const db = new loki('data.db')

const services = db.addCollection('services')

serviceUpdate = {
	update: service => serviceUpdate[service.status](service),
	starting: ({ status, name, hash }) => services.insert({ status, name, hash }),
	up: ({ status, name, hash }) => {
		const service = services.findOne({ hash })
		if (!service)
			return serviceUpdate.starting({ status, name, hash })
		service.status = status
		services.update(service)

	},
	down: ({ hash }) => {
		const service = services.findOne({ hash })
		services.remove(service)
	}
}

const database = {
	services,
	getNetwork: res => database.store.createReadStream().pipe(res),
	updateNetwork: services => services.forEach(serviceUpdate.update),
	getServiceStatus: serviceName => new Promise((resolve, reject) => {
		database.store.get(serviceName, (err, value) => {
			if (err) return reject(err)
				console.log(`[SUCCESS] ${serviceName} have been get`)
				resolve(value)
		})
	})
}

module.exports = database