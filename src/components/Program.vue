<template>
  <div class="programcontainer border">
    <div class="timecontainer border">
      <p>{{time}}</p>
    </div>
    <program-container :title="title" :description="description" />
    <div class="stationimg border">
      <img :src="imgSrc" />
    </div>
  </div>
</template>

<script>
import ProgramContainer from "./ProgramDescription"

export default {
  name: "Program",
  props: {
      title: String,
      description: String,
      time: String,
      imgSrc: String,
  },
  components: {
      ProgramContainer
  }
}
</script>


<style scoped>
.programcontainer {
  display: flex;
}

.timecontainer {
  display: flex;
  align-items: center;
  margin: 1em;
}

.timecontainer > p {
  margin: 1em;
}

.stationimg > img {
  height: 100px;
  width: 100px;
  margin: 1em;
}
</style>