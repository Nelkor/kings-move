<template>
  <div class="overlay game-statistics">
    <div class="item">Сыграно игр: {{ history.length }}</div>
    <div class="item">Побед: {{ wins }}</div>
    <div class="item">Доля побед: {{ winRate }}%</div>
  </div>
</template>

<script>
import { STAGES } from '@engine/helpers/stages'

export default {
  name: 'GameStatistics',
  computed: {
    history() {
      return this.$store.state.engine.history
    },
    wins() {
      return this.countOf(STAGES.VICTORY)
    },
    winRate() {
      return this.history.length
        ? Math.round(this.wins / this.history.length * 100)
        : 0
    },
  },
  methods: {
    countOf(result) {
      return this.history.filter(game => game == result).length
    },
  },
}
</script>
