const express = require('express')
const romanize = require('./romanize')
const { errorMiddleware } = require('./errors')
const events = require('./events')

const port = 8888

function init() {
  try {
    const app = express()

    // MIDDLEWARE TO PARSE JSON PAYLOADS
    app.use(express.json())

    // ACCEPT REQUEST FROM VUE APP ORIGIN AND CONTENT-TYPE HEADER (FOR JSON)
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080")
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })

    app.post('/romanize', async (req, res, next) => {
      try {
        const romanNumber = romanize(req.body.number)
        events.emit('roman', romanNumber)
        res.status(200).end()
      } catch (err) {
        next(err)
      }
    })

    app.get('/events', (req, res) => {
      console.info('Client connected to sse')
      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      }
      res.writeHead(200, headers)

      events.on('roman', (roman) => {
        res.write(`data: ${JSON.stringify({ roman })}\n\n`)
      })
      events.on('error', (err) => {
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
      })
    })

    // ERROR HANDLING
    app.use(errorMiddleware)

    // START SERVER
    app.listen(port, () => console.log(`Api listening on http://localhost:${port}`))

  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

init()
