const express = require('express')
const romanize = require('./romanize')
const { errorMiddleware } = require('./errors')

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
        const roman = romanize(req.body.number)
        res.json({ roman })
      } catch (err) {
        next(err)
      }
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
