const axios = require('axios')
const FormData = require('form-data')
const sharp = require('sharp')
const { createReadStream } = require('fs')

const HOST = process.env.HOST || 'https://pictoria.s.ix3.space'
const UPLOAD_ENDPOINT = `${HOST}/upload`
const GET_ENDPOINT = `${HOST}/get`
const ASSETS_FOLDER = `${__dirname}/demo-assets`
const LITTLE_ASSET_NAME = 'little.jpeg'
const BIG_ASSET_NAME = 'big.jpeg'
const BIG_AND_SQUASHED_ASSET_NAME = 'big-and-squashed.jpeg'

const uploadAndGet = async (formData, label) => {
  console.log('Trying to upload', label, '...')
  const { data } = await axios.post(UPLOAD_ENDPOINT, formData, {
    headers: { ...formData.getHeaders() },
  })
  console.log(data)

  console.log('Trying to get', label, '...')
  const { data: image } = await axios.get(`${GET_ENDPOINT}/${data.id}`, {
    responseType: 'arraybuffer',
  })
  const { width, height } = await sharp(image).metadata()
  console.log('Got image with dimensions', `${width}x${height}`)
  console.log('------------------')
}

;(async () => {
  // загружаем картиночки в память
  const names = [LITTLE_ASSET_NAME, BIG_ASSET_NAME, BIG_AND_SQUASHED_ASSET_NAME]
  const [littleFormData, bigFormData, bigAndSquashedFormData] = names.map(
    (name) => {
      const data = new FormData()
      data.append(
        'image',
        createReadStream(`${ASSETS_FOLDER}/${name}`),
        'myimage.jpeg',
      )
      return data
    },
  )

  await uploadAndGet(littleFormData, 'the smallest asset')
  await uploadAndGet(bigFormData, 'bigger asset')
  await uploadAndGet(bigAndSquashedFormData, 'the biggest and squashed asset')
})().catch((e) => console.error('Error happened', e))
