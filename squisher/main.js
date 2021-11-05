const canvas = document.querySelector('canvas')
const button = document.querySelector('button')
const input = document.querySelector('input')

const c = canvas.getContext('2d')

const CHECKMATE = 20

button.addEventListener('click', () => {
  const url = input.value

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

    window.location = canvas.toDataURL('image/jpeg')
  }
})
