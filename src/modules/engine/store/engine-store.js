import { getGameResult } from '@net/helpers/api'

import { wait } from '../helpers/wait-time'
import { changeStage } from '../helpers/stage-machine'
import { STAGES } from '../helpers/stages'

import {
  showKing,
  moveKing,
  hideKing,
  zoomTo,
  createKnight,
  moveKnight,
  removeKnights,
  showManyRedLights,
  hideAllHighlights,
} from '../helpers/drawable-state'

const defaultDuration = 400
const longDuration = defaultDuration * 2
const shortDuration = defaultDuration / 2

const closeZoom = 5 / 3
const farZoom = 1

export default {
  namespaced: true,
  state: {
    stage: STAGES.READY_TO_START,
    history: [],
  },
  mutations: {
    changeStage(state, stage) {
      state.stage = stage
    },
    saveToHistory: state => state.history.push(state.stage),
  },
  actions: {
    async start() {
      removeKnights()
      hideAllHighlights(defaultDuration)
      moveKing(12, defaultDuration)
      zoomTo(closeZoom, defaultDuration)

      await wait(defaultDuration)

      showKing(defaultDuration)

      await wait(defaultDuration)

      changeStage(STAGES.WAIT_FOR_PLAYER)
    },
    async step(_, cell) {
      changeStage(STAGES.FINISH)

      moveKing(cell, defaultDuration)

      const fetchPromise = getGameResult(cell)
      const waitPromise = wait(longDuration)

      const {
        isVictory,
        knights,
        cells,
      } = (await Promise.all([fetchPromise, waitPromise]))[0]

      knights.forEach(cell => createKnight(cell))

      zoomTo(farZoom, defaultDuration)

      await wait(longDuration)

      showManyRedLights(cells, 0)

      await wait(longDuration)

      if (!isVictory) {
        moveKnight(0, cell, defaultDuration)

        await wait(shortDuration)

        hideKing(shortDuration)

        await wait(defaultDuration)
      }

      changeStage(isVictory ? STAGES.VICTORY : STAGES.DEFEAT)
    },
  },
}
