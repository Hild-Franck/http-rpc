const ava = require('ava')
const http = require('http')
const concat = require('concat-stream')

const database = require('../src/database')

const promise = require('./databaseSetup')

ava.cb.before(t => {
	promise('databaseTestDB').then(db => {
			database.init('databaseTestDB')
			t.end()
	})
})

ava.cb('update the network', t => {
	database.updateNetwork([
		{ type: 'put', key: 'service-test01', value: { status: 'stopping' } }
	]).then(nodes => {
		database.getServiceStatus('service-test01').then(value => {
			t.is(value.status, 'stopping')
			t.end()
		})
	})
})

ava.cb('set the network status', t => {
	database.getServiceStatus('service-test01').then(value => {
		t.is(value.status, 'stopping')
		t.end()
	})
})

ava.cb('pipe all database', t => {
	database.pipeNetwork(concat(buf => {
		t.is(buf[0].value.status, 'stopping')
		t.is(buf[1].value.status, 'starting')
		t.end()
	}))
})

ava.cb('get all database', t => {
	database.getNetwork().then(network => {
		console.log(network)
		t.is(network[0].value.status, 'stopping')
		t.is(network[1].value.status, 'starting')
		t.end()
	})
})

ava.cb('clear database', t => {
	database.clear().then(() => {
		database.getNetwork().then(network => {
		console.log(network)
		t.is(network.length, 0)
		t.end()
	})
	})
})