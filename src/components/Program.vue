<template>
  <div class="programcontainer border">
    <div class="timecontainer border">
      <p><strong>{{time}}</strong></p>
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
  border: 2px lightgray solid;
}

.programcontainer + .programcontainer{
  border-top: none;
}

.timecontainer {
  display: flex;
  align-items: center;
  border-right: 2px lightgray solid;
  padding: 0.5em;
}

.timecontainer > p {
    font-size: 1.25em;
}

.timecontainer > p {
  margin: 1em;
}

.stationimg {
    border-left: 2px lightgray solid;
}

.stationimg > img {
  height: 80px;
  width: 80px;
  margin: 1em;
}
</style>