<template>
  <div id="app">
    <GameCanvas/>
    <GameStatistics/>
    <GameCover/>
  </div>
</template>

<script>
import GameCanvas from '@view/components/GameCanvas'
import GameStatistics from '@ui/components/GameStatistics'
import GameCover from '@ui/components/GameCover'

export default {
  name: 'App',
  components: {
    GameCanvas,
    GameStatistics,
    GameCover,
  },
}
</script>
