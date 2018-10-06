'use strict'

var Client = require('..')
var test = require('tap').test

test('Client with tcp', function (t) {
  var client = Client({
    type: 'tcp'
  })

  client.send({
    foo: 'bar'
  })

  t.deepEqual(
    client.transport.messages[0],
    '{"foo":"bar"}',
    'message should be sent'
  )
  t.end()
})
