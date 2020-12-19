import { images } from './images'

import {
  getKing,
  getSide,
  getZoom,
  getBacklights,
  getKnights,
} from '@engine/helpers/drawable-state'

export const startDrawing = ctx => {
  const deskImg = images.get('desk')
  const kingImg = images.get('king')
  const knightImg = images.get('knight')

  const restoreGlobalAlpha = () => {
    ctx.globalAlpha = 1
  }

  const draw = () => {
    requestAnimationFrame(draw)

    const now = Date.now()
    const side = getSide()
    const zoom = getZoom(now)
    const scaledSide = side * zoom
    const start = -scaledSide / 2
    const scaledFifths = scaledSide / 5

    const scalePoint = a => start + a * scaledFifths


    // Очистка и фон
    ctx.clearRect(-side / 2, -side / 2, side, side)
    ctx.drawImage(deskImg, start, start, scaledSide, scaledSide)


    // Подсветки
    getBacklights(now).forEach(({ point, alpha, positive }) => {
      const [x, y] = point.map(scalePoint)
      const color = [...(positive ? [0, 255] : [255, 0]), 0, alpha * .2]

      ctx.fillStyle = `rgba(${color.join()})`

      ctx.beginPath()
      ctx.rect(x, y, scaledFifths, scaledFifths)
      ctx.fill()
    })


    // Король
    const { x: kx, y: ky, alpha } = getKing(now)
    const kxy = [kx, ky].map(scalePoint)

    ctx.globalAlpha = alpha
    ctx.drawImage(kingImg, ...kxy, scaledFifths, scaledFifths)

    restoreGlobalAlpha()


    // Кони
    getKnights(now).forEach(point => {
      const [x, y] = point.map(scalePoint)

      ctx.drawImage(knightImg, x, y, scaledFifths, scaledFifths)
    })
  }

  draw()
}
