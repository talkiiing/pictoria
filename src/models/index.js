const createImageModel = require('./image')

module.exports = (app) => {
  const Image = createImageModel(app)
  app.models = {
    Image,
  }
}
