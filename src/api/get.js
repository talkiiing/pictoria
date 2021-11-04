const sharp = require('sharp')

module.exports = (app) => async (req, res) => {
  const { id } = req.params
  const { scale } = req.query

  const image = await app.models.Image.findOne({
    where: { id },
  })

  if (!scale) {
    res.contentType('image/jpeg')
    return res.end(image.data)
  }

  const imageResolver = sharp(image.data)

  const { width, height } = await imageResolver.metadata()

  const [newWidth, newHeight] = [width, height]
    .map((v) => v * scale)
    .map((v) => Math.floor(v))

  const scaled = await imageResolver
    .resize({
      width: newWidth,
      height: newHeight,
    })
    .toBuffer()

  res.contentType('image/jpeg')
  return res.end(scaled)
}
