const ava = require('ava')
const concat = require('concat-stream')

const database = require('../src/database')
const setup = require('./databaseSetup')

ava.before(t => setup(database))

ava('update network', t => {
	const newData = database.updateNetwork([
		{ status: 'starting', name: 'service02', hash: '2'},
		{ status: 'up', name: 'service01', hash: '1'},
		{ status: 'down', name: 'service00', hash: '0'},
	])
	const data = database.services.find()

	t.is(data.length, 2)
	t.is(data[0].status, 'up')
	t.is(data[0].hash, '1')
	t.is(data[1].status, 'starting')
	t.is(data[1].hash, '2')
})

ava('get all network', t => {
	const network = database.getNetwork()

	t.is(network.length, 2)
})

ava.cb('pipe network', t => {
	database.pipeNetwork(concat(buff => {
		const network = JSON.parse(buff.toString())
		t.is(network.length, 2)
		t.end()
	}))
})