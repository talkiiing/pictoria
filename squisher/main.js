const canvas = document.querySelector('canvas')
const button = document.querySelector('button')
const urlInput = document.querySelector('#url')
const numberInput = document.querySelector('#number')
const imgtag = document.querySelector('img')

const c = canvas.getContext('2d')

button.addEventListener('click', () => {
  const url = urlInput.value
  const CHECKMATE = numberInput.value

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = url
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    c.drawImage(img, 0, 0, img.width, img.height)

    c.scale(1, -1)
    c.translate(0, -img.height)

    for (let i = 0; i < img.width / CHECKMATE; i++) {
      for (let j = 0; j < img.height / CHECKMATE; j++) {
        if (i % 2 !== j % 2) {
          c.drawImage(
            img,
            i * CHECKMATE,
            img.height - CHECKMATE - j * CHECKMATE,
            CHECKMATE,
            CHECKMATE,
            i * CHECKMATE,
            j * CHECKMATE,
            CHECKMATE,
            CHECKMATE,
          )
        }
      }
    }

    imgtag.src = canvas.toDataURL('image/jpeg')
  }
})
