const data = [
	{ status: 'starting', name: 'service01', hash: '1'},
	{ status: 'up', name: 'service00', hash: '0'}
]

module.exports = database => database.services.insert(data)