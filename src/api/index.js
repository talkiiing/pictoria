const express = require('express')
const multer = require('multer')
const cors = require('cors')

const uploadController = require('./upload')
const getController = require('./get')

module.exports = () => {
  const app = express()
  const upload = multer()

  app.use(cors())

  app.post('/upload', upload.single('image'), uploadController(app))
  app.get('/get/:id', getController(app))

  return app
}
