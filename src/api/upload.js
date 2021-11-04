module.exports = (app) => async (req, res) => {
  const { buffer } = req.file

  const { id } = await app.models.Image.create({
    data: buffer,
  })

  res.json({
    created: true,
    id,
  })
}
