import store from '@/store'

import { instantHighlight } from '@ui/helpers/kings-move'

import { STAGES } from './stages'

const {
  READY_TO_START,
  INIT,
  WAIT_FOR_PLAYER,
  FINISH,
  VICTORY,
  DEFEAT,
} = STAGES

const transitions = {
  [READY_TO_START]: [INIT],
  [INIT]: [WAIT_FOR_PLAYER],
  [WAIT_FOR_PLAYER]: [FINISH],
  [FINISH]: [VICTORY, DEFEAT],
  [VICTORY]: [INIT],
  [DEFEAT]: [INIT],
}

export const changeStage = nextStage => {
  const stage = store.state.engine.stage
  const availableTransitions = transitions[stage]

  if (!availableTransitions.includes(nextStage)) {
    throw new Error(`Prohibited stage change: ${nextStage} from ${stage}`)
  }

  store.commit('engine/changeStage', nextStage)

  switch (nextStage) {
    case INIT:
      store.dispatch('engine/start')

      break
    case WAIT_FOR_PLAYER:
      instantHighlight()

      break
    case VICTORY:
    case DEFEAT:
      store.commit('engine/saveToHistory')

      break
  }
}
