<template>
  <div class="cover-item">
    <h2 v-html="$options.title"/>
    <p>Попробуй ещё!</p>
  </div>
</template>

<script>
export default {
  name: 'CoverLose',
  title: 'Не повезло',
}
</script>
