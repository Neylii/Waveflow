<template>
  <div class="infobox">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Infobox',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.infobox {
    padding: 0.5em;
    margin: 0em;
}

@media screen and (min-width: 700px) {
   
    .infobox {
        display: flex;
        flex-direction: column;
        margin-top: 1em;
        margin-bottom: 3em;
        margin-left: 7em;
        margin-right: 7em;
    }
}

</style>