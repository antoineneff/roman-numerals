class ValidationError extends Error {}

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({ error: 'Une erreur est survenue' })
}

module.exports = { ValidationError, errorMiddleware }
