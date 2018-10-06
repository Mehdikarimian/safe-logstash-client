General purpose logstash

[![Build Status](https://travis-ci.org/Mehdikarimian/safe-logstash-client.svg?branch=master)](https://travis-ci.org/Mehdikarimian/safe-logstash-client)

## Features

* tcp uses [juliangruber](https://github.com/juliangruber)'s [reconnect-net](https://github.com/juliangruber/reconnect-net) for handling reconnection
* logging library independent (there are some logstash clients for winston, bunyan etc)


## Example

```js
var Logstash = require('safe-logstash-client');

var logstash = new Logstash({
  type: 'udp', // udp, tcp
  host: 'logstash.example.org',
  port: 13333
});
logstash.send(message [, callback]);
```

## API

### Constructor

Takes the following parameters:
* **type**: type of connection, currently supported tcp, udp, memory
* **host**: remote hostname
* **port**: remote port
* **format** (optional): formatter function (by default the message gets JSON.stringified)
* **maxQueueSize** (optional): Restricts the amount of messages queued when there is no connection. If not specified the queue is not limited in size.

Example:

```js
new Client({
  type: 'tcp',
  host: 'logstash.example.org',
  port: 8099,
  format: function(message) {
    message.formattedAt = new Date();
    message.password = '!FILTERED!';
    return JSON.stringify(message, null, 2);
  },
  maxQueueSize: 1000
});
```

### Client#send

Takes the following parameters:

* **message**: an object what you are trying to send to your logstash instance
* **callback** (optional): a function called when the message has been sent

Example:

```js
var client = new Client({
  type: 'tcp',
  host: 'example.org',
  port: 1337
});
client.send({
  '@timestamp': new Date(),
  'message': 'Important',
  'level': 'error'
});
```

## License

MIT
