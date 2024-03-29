const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const logger = require('./middleware/loggerMiddleware')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(logger)
app.use(cors())
app.use(routes)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
