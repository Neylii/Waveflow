<template>
  <div class="wave">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Waveflow',
  props: {
    msg: String
  }
}
</script>

<style scoped>
div {
  grid-column: 1/3;
  grid-row: 1;
}
h1 {
  margin: 40px 0 0;
}
</style>
