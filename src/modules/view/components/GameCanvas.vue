<template>
  <canvas
    ref="canvas"
    @mouseenter="onHover"
    @mousemove="onHover"
    @mouseleave="onLeave"
    @click="onClick"
    class="game-canvas"
  />
</template>

<script>
import {
  registerHover,
  registerLeave,
  registerClick,
} from '@ui/helpers/kings-move'

import { init } from '../helpers/canvas'
import { load } from '../helpers/images'

export default {
  name: 'GameCanvas',
  methods: {
    onHover({ offsetX, offsetY }) {
      registerHover(offsetX, offsetY)
    },
    onLeave() {
      registerLeave()
    },
    onClick() {
      registerClick()
    },
  },
  mounted() {
    load().then(() => init(this.$refs.canvas))
  },
}
</script>
