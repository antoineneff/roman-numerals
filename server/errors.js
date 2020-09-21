const events = require('./events')

class ValidationError extends Error {}

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
    if (err instanceof ValidationError) {
        return events.emit('error', err)
    }
    return events.emit(new Error('Une erreur est survenue'))
}

module.exports = { ValidationError, errorMiddleware }
