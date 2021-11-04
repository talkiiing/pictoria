const configureSequelizeClient = require('./db')
const configureModels = require('./models')
const createApp = require('./api')

const { PORT = 3000 } = process.env

const app = createApp()

configureSequelizeClient(app)
configureModels(app)
;(async () => {
  await app.sequelizeClient.sync()

  app.listen(PORT, () => {
    console.log(`Your app listening at http://localhost:${PORT}`)
  })
})()
