<template>
  <div class="title">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Sectiontitle',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.title {
    font-weight: bolder;
    font-size: xx-large;
    margin-top: 0em;
    text-transform: uppercase;
    margin-bottom: 0.5em;
}

</style>