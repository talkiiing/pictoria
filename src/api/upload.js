const { QueryTypes } = require('sequelize')
const sharp = require('sharp')
const { phash } = require('../common/hashing')

module.exports = (app) => async (req, res) => {
  const { buffer } = req.file

  const hash = await phash(buffer)
  const { width, height } = await sharp(buffer).metadata()

  const [candidate] = await app.sequelizeClient.query(
    `
      SELECT x.id, x.distance, x.width, x.height
      FROM (
        SELECT
          *,
          -- calculate hamming distance between elements
          BIT_COUNT(hash ^ $hash) AS distance,
          -- 
          ABS(width / $width - height / $height) < 0.02 AS is_bigger
        FROM images
      ) AS x
      WHERE x.distance < 7 AND x.is_bigger = TRUE
      ORDER BY x.distance ASC;
    `,
    {
      type: QueryTypes.SELECT,
      bind: {
        width,
        height,
        hash,
      },
    },
  )

  if (!candidate) {
    const { id } = await app.models.Image.create({
      data: buffer,
      hash,
      width,
      height,
    })

    return res.json({
      newlyInserted: true,
      id,
      width,
      height,
    })
  }

  const isProportionalAndBigger =
    width > candidate.width &&
    height > candidate.height &&
    Math.abs(width / candidate.width - height / candidate.height) < 0.02

  if (isProportionalAndBigger) {
    await app.sequelizeClient.query(
      'UPDATE images SET data = $data, width = $width, height = $height, hash = $hash WHERE id = $id;',
      {
        type: QueryTypes.UPDATE,
        bind: {
          data: buffer,
          width,
          height,
          hash,
          id: candidate.id,
        },
      },
    )

    return res.json({
      newlyInserted: false,
      updated: true,
      id: candidate.id,
      width,
      height,
    })
  }

  res.json({
    newlyInserted: false,
    updated: false,
    id: candidate.id,
    width: candidate.width,
    height: candidate.height,
  })
}
