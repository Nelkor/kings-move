<template>
  <div class="cover-item">
    <h2 v-html="$options.title"/>
    <p>
      Сделай ход, но знай: лишь половина возможных вариантов приведёт к успеху
    </p>
  </div>
</template>

<script>
export default {
  name: 'CoverStart',
  title: 'Игра "Ход Короля"',
}
</script>
