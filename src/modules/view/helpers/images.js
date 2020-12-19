import desk from '../assets/chess-desk.jpg'
import king from '../assets/wk.webp'
import knight from '../assets/bn.webp'

export const images = new Map

export const load = () => Promise.all([
  createImage('desk', desk),
  createImage('king', king),
  createImage('knight', knight),
])

const createImage = (name, source) => new Promise(resolve => {
  const image = new Image

  images.set(name, image)

  image.onload = resolve
  image.src = source
})
