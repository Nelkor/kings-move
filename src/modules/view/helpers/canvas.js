import { setSide } from '@engine/helpers/drawable-state'

import { startDrawing } from './drawer'

export const init = canvas => {
  const ctx = canvas.getContext('2d')

  const resize = () => {
    const { innerWidth, innerHeight } = window
    const side = Math.min(900, Math.min(innerWidth, innerHeight))

    canvas.width = side
    canvas.height = side

    ctx.translate(side / 2, side / 2)

    setSide(side)
  }

  resize()

  window.addEventListener('resize', resize)

  startDrawing(ctx)
}
