const loki = require('lokijs')
const stream = require('stream')
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
	pipeNetwork: res => {
		const data = JSON.stringify(services.find())
		res.write(data)
		res.end()
	},
	getNetwork: () => services.find(),
	updateNetwork: services => services.forEach(serviceUpdate.update),
	getInstanceStatus: ({ hash }) => services.findOne({ hash })
}

module.exports = database