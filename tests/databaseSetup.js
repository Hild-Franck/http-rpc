const level = require('level')

const data = [
	{ type: 'put', key: 'service-test01', value: { status: 'up' } },
	{ type: 'put', key: 'service-test02', value: { status: 'starting' } }
]

module.exports = new Promise((resolve, reject) => {
	console.log('Opening store in setup')
	const db = level('../networkDB', { valueEncoding: 'json' })
	db.batch(data, err => {
		db.close()
		resolve(db)
	})
})