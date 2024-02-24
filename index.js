const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())

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


