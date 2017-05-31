const ava = require('ava')
const http = require('http')

const promise = require('./databaseSetup')
const discoverNetwork = require('../src/discoverNetwork')
const setNetworkStatus = require('../src/setNetworkStatus')
const database = require('../src/database')

ava.cb.before(t => {
	promise.then(db => {
		t.end()
	})
})

ava.cb('reach a service from a list of ip', t => {
	discoverNetwork({ ipList: ['localhost:8080'] })
		.then(res => {
			t.pass()
			t.end()
		})
})

ava.cb('get a JSON from the reached service', t => {
	http.get(`http://localhost:8080`, res => {
		setNetworkStatus(res).then(obj => {
			t.is(obj.chicken, 'rosted')
			t.end()
		})
	})
})

ava.cb('set the network status', t => {
	database.init().getServiceStatus('service-test01').then(value => {
		console.log(value)
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