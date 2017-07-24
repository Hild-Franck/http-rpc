const ava = require('ava')
const http = require('http')

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

// ava.cb('set the network status', t => {
// 	database.init().getServiceStatus('service-test01').then(value => {
// 		t.is(value.status, 'up')
// 		t.end()
// 	})
// })

// ava.cb('update the network', t => {
// 	database.init().updateNetwork([
// 		{ type: 'put', key: 'service-test01', value: { status: 'stopping' } }
// 	]).then(nodes => {
// 		database.getServiceStatus('service-test01').then(value => {
// 			t.is(value.status, 'stopping')
// 			t.end()
// 		})
// 	})
// })

// ava.cb('get all database', t => {
// 	database.init().getNetwork(concat(buf => {
// 		console.log('Buf: ', buf)
// 		t.is(buf[0].value.chicken, 'rosted')
// 		t.is(buf[1].value.status, 'stopping')
// 		t.end()
// 	}))
// })
