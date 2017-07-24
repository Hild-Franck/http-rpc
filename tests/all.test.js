// const ava = require('ava')
// const http = require('http')
// const concat = require('concat-stream')

// const discoverNetwork = require('../src/discoverNetwork')
// const setNetworkStatus = require('../src/setNetworkStatus')
// const database = require('../src/database')

// ava.cb('reach a service from a list of ip', t => {
// 	discoverNetwork({ ipList: ['localhost:8080', 'localhost:8099', 'localhost:8080'] })
// 		.then(res => {
// 			t.pass()
// 			t.end()
// 		})
// })

// ava.cb('get a JSON from the reached service', t => {
// 	http.get(`http://localhost:8080`, res => {
// 		setNetworkStatus(res).then(db => {
// 			db.getServiceStatus('jesus').then(value => {
// 				t.is(value.chicken, 'rosted')
// 				t.end()
// 			})
// 		})
// 	})
// })
