<template>
  <div id="contentcontainer" class="border">
    <h2>{{title}}</h2>
    <p>{{description}}</p>
  </div>
</template>

<script>
export default {
  name: "ProgramDescription",
  props: {
      title: String,
      description: String,
  }
}
</script>

<style scoped>
.contentcontainer {
  text-align: center;
  flex-grow: 1;
}

#contentcontainer {
  text-align: center;
  flex-grow: 1;
}
</style>