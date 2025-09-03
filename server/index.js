const express = require('express')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
const { connectToDatabase } = require('./src/db/mongoose')

const app = express()

app.use(cors())
app.use(express.json())

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Mount API routes
const apiRouter = require('./src/routes')
app.use('/api', apiRouter)

const PORT = process.env.PORT || 4000

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })


