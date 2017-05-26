const ava = require('ava')
const http = require('http')

const discoverNetwork = require('../src/discoverNetwork')
const setNetworkStatus = require('../src/setNetworkStatus')

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