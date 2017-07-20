const ava = require('ava')
const http = require('http')
const concat = require('concat-stream')

const database = require('../src/database')

const promise = require('./databaseSetup')


http.createServer((req, res) => {
	database.init().getNetwork(res)
}).listen(8000)

ava.cb.before(t => {
	promise.then(db => {
		t.end()
	})
})

ava.cb('set the network status', t => {
	database.init().getServiceStatus('service-test01').then(value => {
		t.is(value.status, 'up')
		t.end()
	})
})

ava.cb('update the network', t => {
	database.init().updateNetwork([
		{ type: 'put', key: 'service-test01', value: { status: 'stopping' } }
	]).then(nodes => {
		database.getServiceStatus('service-test01').then(value => {
			t.is(value.status, 'stopping')
			t.end()
		})
	})
})

ava.cb('get all database', t => {
	database.init().getNetwork(concat(buf => {
		console.log('Buf: ', buf)
		t.is(buf[0].value.chicken, 'rosted')
		t.is(buf[1].value.status, 'stopping')
		t.end()
	}))
})
