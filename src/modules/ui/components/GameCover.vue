<template>
  <div
    :class="['hiding overlay game-cover', { shown: cover } ]"
    @click="startNewGame"
  >
    <component :is="cover"/>
  </div>
</template>

<script>
import { changeStage } from '@engine/helpers/stage-machine'
import { STAGES } from '@engine/helpers/stages'

import CoverStart from './CoverStart'
import CoverVictory from './CoverVictory'
import CoverLose from './CoverLose'

const {
  READY_TO_START,
  INIT,
  VICTORY,
  DEFEAT,
} = STAGES

export default {
  name: "GameCover",
  components: {
    CoverStart,
    CoverVictory,
    CoverLose,
  },
  computed: {
    stage() {
      return this.$store.state.engine.stage
    },
    cover() {
      return {
        [READY_TO_START]: 'cover-start',
        [VICTORY]: 'cover-victory',
        [DEFEAT]: 'cover-lose',
      }[this.stage]
    },
  },
  methods: {
    startNewGame() {
      if (!this.cover) {
        return
      }

      changeStage(INIT)
    },
  },
}
</script>
