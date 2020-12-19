import store from '@/store'

import { STAGES } from '@engine/helpers/stages'
import { gridSideCount } from '@engine/helpers/drawable-state'

import {
  showHighlight,
  hideHighlight,
  getSide,
} from '@engine/helpers/drawable-state'

const localSideCount = gridSideCount - 2
const forbiddenCell = 12

// Магия, отдаёт глобальный индекс ячейки
const pointToCell = (x, y) => (y + 1) * gridSideCount + x + 1

const isBadStage = () => store.state.engine.stage != STAGES.INIT
  && store.state.engine.stage != STAGES.WAIT_FOR_PLAYER

const isNotWaiting = () => store.state.engine.stage != STAGES.WAIT_FOR_PLAYER

let currentCell = 0

const checkCell = cell => {
  if (cell == currentCell) {
    return
  }

  hideHighlight(currentCell)

  if (cell == forbiddenCell) {
    currentCell = 0

    return
  }

  currentCell = cell

  if (isNotWaiting()) {
    return
  }

  showHighlight(cell)
}

export const instantHighlight = () => {
  if (!currentCell || currentCell == forbiddenCell) {
    return
  }

  showHighlight(currentCell)
}

export const registerHover = (x, y) => {
  if (isBadStage()) {
    return
  }

  const side = getSide()
  const sideMultiplier = localSideCount / side

  const [xCell, yCell] = [x, y].map(a => {
    a = Math.min(side - 1, Math.max(0, a))

    return Math.floor(sideMultiplier * a)
  })

  checkCell(pointToCell(xCell, yCell))
}

export const registerLeave = () => {
  if (!isBadStage()) {
    hideHighlight(currentCell)
  }

  currentCell = 0
}

export const registerClick = () => {
  if (isNotWaiting() || !currentCell) {
    return
  }

  store.dispatch('engine/step', currentCell)
}
