const EventEmitter = require('events')

const events = new EventEmitter()
events.setMaxListeners(1)

module.exports = events
